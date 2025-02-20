package com.ecom.dto.request;

import com.ecom.entity.enums.OrderStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {
    
    @NotNull(message = "Order status cannot be null")
    private OrderStatus orderStatus;

}