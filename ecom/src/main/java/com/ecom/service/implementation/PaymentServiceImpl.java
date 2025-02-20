package com.ecom.service.implementation;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecom.entity.Order;
import com.ecom.entity.OrderItem;
import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.entity.enums.OrderStatus;
import com.ecom.entity.enums.PaymentStatus;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.exceptions.UnauthorizedException;
import com.ecom.repository.OrderRepository;
import com.ecom.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Address;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    @Transactional
    public String initiatePayment(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + orderId));

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!user.equals(order.getUser())) {
            throw new UnauthorizedException("order does not belong to this user " + user.getId());
        }

        try {
            // Create a Stripe customer
            CustomerCreateParams customerParams = CustomerCreateParams.builder()
                    .setName(user.getName())
                    .setEmail(user.getEmail())
                    .build();
            Customer customer = Customer.create(customerParams);

            // 🔹 Map Order Items to Stripe Line Items
            List<SessionCreateParams.LineItem> lineItems = order.getOrderItems().stream()
                    .map((OrderItem item) -> { // 🔹 Explicitly specify `OrderItem` type

                        return SessionCreateParams.LineItem.builder()
                                .setQuantity((long) item.getQuantity())
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("inr")
                                        .setUnitAmount(item.getProduct().getPrice().multiply(BigDecimal.valueOf(100))
                                                .longValue())
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(item.getProduct().getName())
                                                .addImage(item.getProduct().getImages()[0])
                                                .build())
                                        .build())
                                .build();
                    })
                    .collect(Collectors.toList());

            // Create Stripe checkout session
            SessionCreateParams sessionParams = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.REQUIRED)
                    .setCustomer(customer.getId())
                    .setSuccessUrl(frontendUrl) 
                    .setCancelUrl(frontendUrl + "/cancel") 
                    .addAllLineItem(lineItems) 
                    .build();

            Session session = Session.create(sessionParams);

            order.setPaymentSessionId(session.getId());
            orderRepository.save(order);

            return session.getUrl();

        } catch (StripeException e) {
            throw new RuntimeException("Stripe payment failed", e);
        }

    }

    @Override
    @Transactional
    public void capturePayment(Event event) {
        String eventType = event.getType();

        // ✅ Only process checkout session events since we don't have paymentIntentId
        if ("checkout.session.completed".equals(eventType) ||
                "checkout.session.async_payment_failed".equals(eventType) ||
                "checkout.session.expired".equals(eventType)) {

            Session session = event.getDataObjectDeserializer().getObject()
                    .map(obj -> (Session) obj)
                    .orElse(null);

            if (session == null) {
                throw new RuntimeException("Failed to parse session object");
            }

            processSessionEvent(session, eventType);
        }
    }

    private void processSessionEvent(Session session, String eventType) {
        String sessionId = session.getId();

        Order order = orderRepository.findByPaymentSessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for session ID " + sessionId));

        if ("checkout.session.completed".equals(eventType)) {
            order.setPaymentStatus(PaymentStatus.PAID);
            order.setOrderStatus(OrderStatus.CONFIRM);

            // ✅ Deduct stock after successful payment
            for (OrderItem item : order.getOrderItems()) {
                Product product = item.getProduct();
                product.setStock(product.getStock() - item.getQuantity());
            }

            Address billingAddress = session.getCustomerDetails().getAddress();
            if (billingAddress != null) {
                String fullAddress = String.format("%s, %s%s, %s, %s, %s",
                        billingAddress.getLine1(),
                        billingAddress.getLine2() != null ? billingAddress.getLine2() + ", " : "",
                        billingAddress.getCity(),
                        billingAddress.getState(),
                        billingAddress.getPostalCode(),
                        billingAddress.getCountry());
                order.setAddress(fullAddress);
            }
        } else { // Handles failed/canceled payments
            order.setPaymentStatus(PaymentStatus.FAILED);
            order.setOrderStatus(OrderStatus.CANCELED);
        }

        orderRepository.save(order);
    }

}