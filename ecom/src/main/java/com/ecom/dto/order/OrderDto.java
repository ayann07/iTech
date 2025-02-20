package com.ecom.dto.order;

import java.math.BigDecimal;
import java.util.List;
import lombok.Data;

@Data
public class OrderDto {

    private Long id;

    private OrderUserDto user;

    private BigDecimal totalPrice;

    private String paymentStatus;
    
    private String orderStatus;

    private String address;

    private List<OrderItemDto> orderItems;
}