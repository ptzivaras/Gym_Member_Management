package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.PaymentCreateDTO;
import com.example.GymCustomers.dto.PaymentResponseDTO;
import com.example.GymCustomers.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        List<PaymentResponseDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @PostMapping("/payments")
    public ResponseEntity<PaymentResponseDTO> createPayment(@Valid @RequestBody PaymentCreateDTO dto) {
        PaymentResponseDTO created = paymentService.createPayment(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
