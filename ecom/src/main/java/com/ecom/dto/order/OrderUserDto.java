package com.ecom.dto.order;

import lombok.Data;

@Data
public class OrderUserDto {
    private Long id;
    private String email;
    private String name;
}