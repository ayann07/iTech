package com.ecom.service;

import com.stripe.model.Event;

public interface PaymentService {
    
    String initiatePayment(Long orderId);

    void capturePayment(Event event);

}