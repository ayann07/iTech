package com.ecom.dto.cart;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartProductDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private String [] images;
}