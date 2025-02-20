package com.ecom.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class OrderRequest {

    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemRequest> orderItems;

}