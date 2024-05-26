package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Payments;
import com.example.GymCustomers.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1/")
public class PaymentsController {
    @Autowired
    private PaymentsRepository paymentRepository;

    @GetMapping("/payments")
    public List<Payments> getAllPayments() {
        return paymentRepository.findAll();
    }
}
