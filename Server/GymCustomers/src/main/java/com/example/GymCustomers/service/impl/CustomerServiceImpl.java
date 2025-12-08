package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.mapper.CustomerMapper;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
    
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {
        logger.info("Fetching all customers");
        List<CustomerResponseDTO> customers = customerRepository.findAll().stream()
                .map(customerMapper::toResponseDTO)
                .collect(Collectors.toList());
        logger.info("Retrieved {} customers", customers.size());
        return customers;
    }
    
    @Override
    public PagedResponseDTO<CustomerResponseDTO> getAllCustomersPaginated(Pageable pageable) {
        logger.info("Fetching customers - Page: {}, Size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Customer> customerPage = customerRepository.findAll(pageable);
        
        List<CustomerResponseDTO> content = customerPage.getContent().stream()
                .map(customerMapper::toResponseDTO)
                .collect(Collectors.toList());
        
        logger.info("Retrieved {} customers out of {} total", content.size(), customerPage.getTotalElements());
        
        return new PagedResponseDTO<>(
                content,
                customerPage.getNumber(),
                customerPage.getSize(),
                customerPage.getTotalElements(),
                customerPage.getTotalPages()
        );
    }

    @Override
    public CustomerResponseDTO createCustomer(CustomerCreateDTO dto) {
        logger.info("Creating new customer with email: {}", dto.getEmail());
        Customer customer = customerMapper.toEntity(dto);
        Customer savedCustomer = customerRepository.save(customer);
        logger.info("Customer created successfully with ID: {}", savedCustomer.getCustomerId());
        return customerMapper.toResponseDTO(savedCustomer);
    }

    @Override
    public Optional<CustomerResponseDTO> getCustomerById(Long customerId) {
        logger.info("Fetching customer with ID: {}", customerId);
        Optional<CustomerResponseDTO> customer = customerRepository.findById(customerId)
                .map(customerMapper::toResponseDTO);
        
        if (customer.isPresent()) {
            logger.info("Customer found with ID: {}", customerId);
        } else {
            logger.warn("Customer not found with ID: {}", customerId);
        }
        
        return customer;
    }

    @Override
    public Optional<CustomerResponseDTO> updateCustomer(Long customerId, CustomerUpdateDTO dto) {
        logger.info("Updating customer with ID: {}", customerId);
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        
        if (customerOptional.isPresent()) {
            Customer existingCustomer = customerOptional.get();
            customerMapper.updateEntity(existingCustomer, dto);
            Customer updatedCustomer = customerRepository.save(existingCustomer);
            logger.info("Customer updated successfully with ID: {}", customerId);
            return Optional.of(customerMapper.toResponseDTO(updatedCustomer));
        }
        
        logger.warn("Cannot update - Customer not found with ID: {}", customerId);
        return Optional.empty();
    }

    @Override
    public boolean deleteCustomer(Long customerId) {
        logger.info("Attempting to delete customer with ID: {}", customerId);
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
            logger.info("Customer deleted successfully with ID: {}", customerId);
            return true;
        }
        logger.warn("Cannot delete - Customer not found with ID: {}", customerId);
        return false;
    }
}
