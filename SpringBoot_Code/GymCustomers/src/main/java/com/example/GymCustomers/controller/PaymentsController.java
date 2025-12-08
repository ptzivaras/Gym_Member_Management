package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Payments;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.repository.PaymentsRepository;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.repository.MembershipsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PaymentsController {
    @Autowired
    private PaymentsRepository paymentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MembershipsRepository membershipsRepository;

    @GetMapping("/payments")
    public List<Payments> getAllPayments() {
        return paymentRepository.findAll();
    }

    @PostMapping("/payments")
    public ResponseEntity<?> createPayment(@RequestBody Payments paymentRequest) {
        // Fetch customer and membership based on the IDs sent from the frontend
        Optional<Customer> customerOptional = customerRepository.findById(paymentRequest.getCustomer().getCustomerId());
        Optional<Memberships> membershipOptional = membershipsRepository.findById(paymentRequest.getMembership().getMembershipId());

        if (customerOptional.isPresent() && membershipOptional.isPresent()) {
            Customer customer = customerOptional.get();
            Memberships membership = membershipOptional.get();

            // Calculate expiration date based on the membership's duration
            LocalDate paymentDate = LocalDate.now();
            LocalDate expirationDate = paymentDate.plusMonths(membership.getDuration());

            // Set payment amount based on the membership's price
            BigDecimal paymentAmount = BigDecimal.valueOf(membership.getPrice());

            // Create and save the payment record
            Payments payment = new Payments();
            payment.setCustomer(customer);
            payment.setMembership(membership);
            payment.setPaymentDate(paymentDate);
            payment.setExpirationDate(expirationDate);
            payment.setAmount(paymentAmount);

            Payments savedPayment = paymentRepository.save(payment);

            // Return the saved payment as a response
            return ResponseEntity.ok(savedPayment);
        } else {
            // Return an error if the customer or membership is not found
            return ResponseEntity.badRequest().body("Customer or Membership not found.");
        }
    }
}
