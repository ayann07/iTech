package com.ecom.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.cart.CartDto;
import com.ecom.dto.request.CartItemAddRequest;
import com.ecom.service.CartService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/cart")
@RequiredArgsConstructor
@RestController
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartDto> addItemToCart(@RequestBody CartItemAddRequest request) {
        return new ResponseEntity<>(cartService.addItem(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<CartDto> getUserCart() {
        return ResponseEntity.ok(cartService.getUserCart());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<CartDto> removeCart() {
        cartService.removeCart();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/item/{id}")
    public ResponseEntity<CartDto> removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/item/increment/{id}")
    public ResponseEntity<CartDto> incrementItem(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.incrementItem(id));
    }

    @PutMapping("/item/decrement/{id}")
    public ResponseEntity<CartDto> decrementItem(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.decrementItem(id));
    }

}