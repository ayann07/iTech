package com.ecom.dto.request;

import java.util.List;

import com.ecom.entity.enums.PaymentMethod;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequest {

    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemRequest> orderItems;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod; 

    @NotEmpty(message = "Shipping address is required")
    private String shippingAddress;

}