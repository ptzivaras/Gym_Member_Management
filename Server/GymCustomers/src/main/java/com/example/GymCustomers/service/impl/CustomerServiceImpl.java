package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.mapper.CustomerMapper;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerResponseDTO createCustomer(CustomerCreateDTO dto) {
        Customer customer = customerMapper.toEntity(dto);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toResponseDTO(savedCustomer);
    }

    @Override
    public Optional<CustomerResponseDTO> getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .map(customerMapper::toResponseDTO);
    }

    @Override
    public Optional<CustomerResponseDTO> updateCustomer(Long customerId, CustomerUpdateDTO dto) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        
        if (customerOptional.isPresent()) {
            Customer existingCustomer = customerOptional.get();
            customerMapper.updateEntity(existingCustomer, dto);
            Customer updatedCustomer = customerRepository.save(existingCustomer);
            return Optional.of(customerMapper.toResponseDTO(updatedCustomer));
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
