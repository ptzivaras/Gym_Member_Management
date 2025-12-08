package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.PaymentCreateDTO;
import com.example.GymCustomers.dto.PaymentResponseDTO;

import java.util.List;

public interface PaymentService {
    
    List<PaymentResponseDTO> getAllPayments();
    
    PaymentResponseDTO createPayment(PaymentCreateDTO dto);
}
