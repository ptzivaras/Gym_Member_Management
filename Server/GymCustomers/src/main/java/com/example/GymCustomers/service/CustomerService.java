package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    
    /**
     * Get all customers
     * @return List of all customers as DTOs
     */
    List<CustomerResponseDTO> getAllCustomers();
    
    /**
     * Create a new customer
     * @param dto Customer create DTO
     * @return Created customer as DTO
     */
    CustomerResponseDTO createCustomer(CustomerCreateDTO dto);
    
    /**
     * Get customer by ID
     * @param customerId Customer ID
     * @return Optional containing customer DTO if found
     */
    Optional<CustomerResponseDTO> getCustomerById(Long customerId);
    
    /**
     * Update existing customer
     * @param customerId Customer ID
     * @param dto Updated customer data
     * @return Optional containing updated customer DTO if found
     */
    Optional<CustomerResponseDTO> updateCustomer(Long customerId, CustomerUpdateDTO dto);
    
    /**
     * Delete customer by ID
     * @param customerId Customer ID
     * @return true if deleted, false if not found
     */
    boolean deleteCustomer(Long customerId);
}
