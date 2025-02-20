package com.ecom.dto.cart;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CartDto {

    private Long id;

    private CartUserDto user;

    private BigDecimal totalPrice;

    private List<CartItemDto> cartItems;
}