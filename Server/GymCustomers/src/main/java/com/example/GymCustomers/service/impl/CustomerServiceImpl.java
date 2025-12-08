package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer createCustomer(Customer customer) {
        // Add any business validation here before saving
        return customerRepository.save(customer);
    }

    @Override
    public Optional<Customer> getCustomerById(Long customerId) {
        return customerRepository.findById(customerId);
    }

    @Override
    public Optional<Customer> updateCustomer(Long customerId, Customer updatedCustomerData) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        
        if (customerOptional.isPresent()) {
            Customer existingCustomer = customerOptional.get();
            
            // Update fields
            existingCustomer.setFirstName(updatedCustomerData.getFirstName());
            existingCustomer.setLastName(updatedCustomerData.getLastName());
            existingCustomer.setEmail(updatedCustomerData.getEmail());
            existingCustomer.setPhone(updatedCustomerData.getPhone());
            existingCustomer.setAddress(updatedCustomerData.getAddress());
            
            // Save and return updated customer
            Customer updatedCustomer = customerRepository.save(existingCustomer);
            return Optional.of(updatedCustomer);
        }
        
        return Optional.empty();
    }

    @Override
    public boolean deleteCustomer(Long customerId) {
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
            return true;
        }
        return false;
    }
}
