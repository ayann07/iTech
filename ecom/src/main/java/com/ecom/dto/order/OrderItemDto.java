package com.ecom.dto.order;

import java.math.BigDecimal;


import lombok.Data;

@Data
public class OrderItemDto {
    
    private Long id;

    private OrderProductDto product;

    private Integer quantity;

    private BigDecimal price;

}