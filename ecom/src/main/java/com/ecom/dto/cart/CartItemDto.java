package com.ecom.dto.cart;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartItemDto {
    
    private Long id;

    private CartProductDto product;

    private Integer quantity;

    private BigDecimal subprice;
}