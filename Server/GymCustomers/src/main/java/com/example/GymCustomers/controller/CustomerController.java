package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
    
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers(){
        List<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @PostMapping("/customers")
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerCreateDTO customerDTO) {
        CustomerResponseDTO createdCustomer = customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long customerId) {
        Optional<CustomerResponseDTO> customer = customerService.getCustomerById(customerId);
        return customer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/customers/{customerId}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(
            @PathVariable Long customerId, 
            @Valid @RequestBody CustomerUpdateDTO customerDTO) {
        Optional<CustomerResponseDTO> updatedCustomer = customerService.updateCustomer(customerId, customerDTO);
        return updatedCustomer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/customers/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long customerId) {
        boolean deleted = customerService.deleteCustomer(customerId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
