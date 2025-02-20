package com.ecom.dto.cart;

import lombok.Data;

@Data
public class CartUserDto {
    private Long id;
    private String email;
    private String name;
}