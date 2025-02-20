package com.ecom.service.implementation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecom.dto.order.OrderDto;
import com.ecom.dto.request.OrderItemRequest;
import com.ecom.dto.request.OrderRequest;
import com.ecom.entity.Order;
import com.ecom.entity.OrderItem;
import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.entity.enums.OrderStatus;
import com.ecom.entity.enums.PaymentStatus;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.OrderRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.OrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getUsersOrders() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Order> orders = orderRepository.findByUserId(user.getId());
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public OrderDto getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(" no order found with given id " + orderId));

        return modelMapper.map(order, OrderDto.class);
    }

    @Override
    public OrderDto updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("order not found with given id " + orderId));

        order.setOrderStatus(orderStatus);
        order = orderRepository.save(order);
        return modelMapper.map(order, OrderDto.class);
    }

    @Override
    @Transactional
    public OrderDto placeOrder(OrderRequest orderRequest) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Order order = Order.builder()
                .user(user)
                .paymentStatus(PaymentStatus.PENDING)
                .orderStatus(OrderStatus.PENDING)
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalOrderPrice = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
            Product product = productRepository.findById(itemRequest.getProductId()).orElseThrow(
                    () -> new ResourceNotFoundException("Product not found with id " + itemRequest.getProductId()));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock of product " + product.getName());
            }

            BigDecimal calculateSubPrice = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .subPrice(calculateSubPrice)
                    .build();

            orderItems.add(orderItem);
            totalOrderPrice = totalOrderPrice.add(calculateSubPrice);
        }
        order.setTotalPrice(totalOrderPrice);
        order.setOrderItems(orderItems);
        order = orderRepository.save(order);
        productRepository.saveAll(
                orderItems.stream()
                        .map(OrderItem::getProduct)
                        .collect(Collectors.toList()));

        return modelMapper.map(order, OrderDto.class);
    }

}