package com.ecom.service;

import com.ecom.dto.cart.CartDto;
import com.ecom.dto.request.CartItemAddRequest;

public interface CartService {
    
    CartDto addItem(CartItemAddRequest cartItemAddRequest);

    CartDto getUserCart();

    void removeCart();
    
    void removeItem(Long productId);

    CartDto incrementItem(Long productId);

    CartDto decrementItem(Long productId);

}