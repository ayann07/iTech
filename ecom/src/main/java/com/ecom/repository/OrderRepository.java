package com.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
    
    List<Order> findByUserId(Long userId);

}