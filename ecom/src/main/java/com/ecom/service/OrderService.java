package com.ecom.service;

import java.util.List;

import com.ecom.dto.order.OrderDto;
import com.ecom.dto.request.OrderRequest;
import com.ecom.entity.enums.OrderStatus;

public interface OrderService {

    List<OrderDto> getAllOrders();

    OrderDto updateOrderStatus(Long orderId,OrderStatus orderStatus);

    List<OrderDto> getUsersOrders();

    OrderDto getOrderDetails(Long orderId);

    OrderDto placeOrder(OrderRequest orderRequest);
    
}