package com.example.GymCustomers.service;

import com.example.GymCustomers.model.Payments;

import java.util.List;

public interface PaymentService {
    
    List<Payments> getAllPayments();
    
    Payments createPayment(Payments payment);
}
