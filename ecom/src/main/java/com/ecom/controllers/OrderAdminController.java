package com.ecom.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.order.OrderDto;
import com.ecom.dto.request.OrderStatusUpdateRequest;
import com.ecom.service.OrderService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/admin/orders")
@RequiredArgsConstructor
@RestController
public class OrderAdminController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OrderDto> updateAnOrder(@PathVariable Long id,
            @RequestBody OrderStatusUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getOrderStatus()));
    }
}