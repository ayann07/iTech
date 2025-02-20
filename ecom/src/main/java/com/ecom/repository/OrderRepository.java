package com.ecom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
    
    List<Order> findByUserId(Long userId);

    Optional<Order> findByPaymentSessionId(String sessionId);

}