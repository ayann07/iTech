package com.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecom.entity.Cart;
import com.ecom.entity.CartItem;
import com.ecom.entity.Product;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

   @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.product = :product")
    Optional<CartItem> findByCartAndProduct(@Param("cart") Cart cart, @Param("product") Product product);
    
} 