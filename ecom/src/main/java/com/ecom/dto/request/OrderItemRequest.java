package com.ecom.dto.request;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;

    private Integer quantity;

}