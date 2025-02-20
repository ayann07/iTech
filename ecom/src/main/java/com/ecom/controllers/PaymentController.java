package com.ecom.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecom.service.PaymentService;
import com.stripe.exception.StripeException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/stripe")
public class PaymentController {
    
    private final PaymentService paymentService;

    @PostMapping("/create-checkout-session/{orderId}")
    public ResponseEntity<Map<String,String>> initiatePayment(@PathVariable Long orderId) throws StripeException
    {
     String sessionUrl=paymentService.initiatePayment(orderId);
     return ResponseEntity.ok(Map.of("sessionUrl",sessionUrl));
    }
}