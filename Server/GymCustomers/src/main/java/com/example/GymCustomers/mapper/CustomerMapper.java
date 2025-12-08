package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.model.Customer;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Customer entity and DTOs
 */
@Component
public class CustomerMapper {

    /**
     * Convert CustomerCreateDTO to Customer entity
     */
    public Customer toEntity(CustomerCreateDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Customer customer = new Customer();
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        
        return customer;
    }

    /**
     * Update existing Customer entity from CustomerUpdateDTO
     */
    public void updateEntity(Customer customer, CustomerUpdateDTO dto) {
        if (customer == null || dto == null) {
            return;
        }
        
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
    }

    /**
     * Convert Customer entity to CustomerResponseDTO
     */
    public CustomerResponseDTO toResponseDTO(Customer customer) {
        if (customer == null) {
            return null;
        }
        
        return new CustomerResponseDTO(
            customer.getCustomerId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getPhone(),
            customer.getAddress()
        );
    }
}
