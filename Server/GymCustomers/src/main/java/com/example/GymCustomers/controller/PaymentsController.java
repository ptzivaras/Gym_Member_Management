package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Payments;
import com.example.GymCustomers.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PaymentsController {
    
    private final PaymentService paymentService;

    @Autowired
    public PaymentsController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/payments")
    public List<Payments> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PostMapping("/payments")
    public ResponseEntity<?> createPayment(@RequestBody Payments paymentRequest) {
        try {
            Payments savedPayment = paymentService.createPayment(paymentRequest);
            return ResponseEntity.ok(savedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
