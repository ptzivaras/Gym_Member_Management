package com.example.GymCustomers.service;

import com.example.GymCustomers.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    
    /**
     * Get all customers
     * @return List of all customers
     */
    List<Customer> getAllCustomers();
    
    /**
     * Create a new customer
     * @param customer Customer to create
     * @return Created customer
     */
    Customer createCustomer(Customer customer);
    
    /**
     * Get customer by ID
     * @param customerId Customer ID
     * @return Optional containing customer if found
     */
    Optional<Customer> getCustomerById(Long customerId);
    
    /**
     * Update existing customer
     * @param customerId Customer ID
     * @param updatedCustomerData Updated customer data
     * @return Optional containing updated customer if found
     */
    Optional<Customer> updateCustomer(Long customerId, Customer updatedCustomerData);
    
    /**
     * Delete customer by ID
     * @param customerId Customer ID
     * @return true if deleted, false if not found
     */
    boolean deleteCustomer(Long customerId);
}
