package com.ecom.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.service.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/webhook")
@RequiredArgsConstructor
public class WebhookController {

    private final PaymentService paymentService;

    @Value("${webhook.secret.key}")
    private String endpointSecret;

    @PostMapping("/payment")
    public ResponseEntity<Void> capturePayments(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            paymentService.capturePayment(event);
            return ResponseEntity.noContent().build();
        } catch (SignatureVerificationException e) {
            throw new RuntimeException(e);
        }

    }

}