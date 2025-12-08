package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.model.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CustomerMapperTest {

    private CustomerMapper customerMapper;

    @BeforeEach
    void setUp() {
        customerMapper = new CustomerMapper();
    }

    @Test
    void shouldMapCreateDTOToEntity() {
        // Given
        CustomerCreateDTO createDTO = new CustomerCreateDTO();
        createDTO.setFirstName("John");
        createDTO.setLastName("Doe");
        createDTO.setEmail("john.doe@example.com");
        createDTO.setPhone("1234567890");
        createDTO.setAddress("123 Main St");

        // When
        Customer customer = customerMapper.toEntity(createDTO);

        // Then
        assertThat(customer).isNotNull();
        assertThat(customer.getFirstName()).isEqualTo("John");
        assertThat(customer.getLastName()).isEqualTo("Doe");
        assertThat(customer.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(customer.getPhone()).isEqualTo("1234567890");
        assertThat(customer.getAddress()).isEqualTo("123 Main St");
        assertThat(customer.getCustomerId()).isNull(); // ID should not be set
    }

    @Test
    void shouldMapEntityToResponseDTO() {
        // Given
        Customer customer = new Customer();
        customer.setCustomerId(1L);
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");

        // When
        CustomerResponseDTO responseDTO = customerMapper.toResponseDTO(customer);

        // Then
        assertThat(responseDTO).isNotNull();
        assertThat(responseDTO.getCustomerId()).isEqualTo(1L);
        assertThat(responseDTO.getFirstName()).isEqualTo("John");
        assertThat(responseDTO.getLastName()).isEqualTo("Doe");
        assertThat(responseDTO.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(responseDTO.getPhone()).isEqualTo("1234567890");
        assertThat(responseDTO.getAddress()).isEqualTo("123 Main St");
    }

    @Test
    void shouldUpdateEntityFromUpdateDTO() {
        // Given
        Customer existingCustomer = new Customer();
        existingCustomer.setCustomerId(1L);
        existingCustomer.setFirstName("John");
        existingCustomer.setLastName("Doe");
        existingCustomer.setEmail("john.doe@example.com");
        existingCustomer.setPhone("1234567890");
        existingCustomer.setAddress("123 Main St");

        CustomerUpdateDTO updateDTO = new CustomerUpdateDTO();
        updateDTO.setFirstName("Jane");
        updateDTO.setLastName("Smith");
        updateDTO.setEmail("jane.smith@example.com");
        updateDTO.setPhone("0987654321");
        updateDTO.setAddress("456 Oak Ave");

        // When
        customerMapper.updateEntity(existingCustomer, updateDTO);

        // Then
        assertThat(existingCustomer.getCustomerId()).isEqualTo(1L); // ID should remain unchanged
        assertThat(existingCustomer.getFirstName()).isEqualTo("Jane");
        assertThat(existingCustomer.getLastName()).isEqualTo("Smith");
        assertThat(existingCustomer.getEmail()).isEqualTo("jane.smith@example.com");
        assertThat(existingCustomer.getPhone()).isEqualTo("0987654321");
        assertThat(existingCustomer.getAddress()).isEqualTo("456 Oak Ave");
    }

    @Test
    void shouldHandleNullValuesInCreateDTO() {
        // Given
        CustomerCreateDTO createDTO = new CustomerCreateDTO();
        createDTO.setFirstName("John");
        createDTO.setLastName("Doe");
        createDTO.setEmail("john@example.com");
        // phone and address are null

        // When
        Customer customer = customerMapper.toEntity(createDTO);

        // Then
        assertThat(customer).isNotNull();
        assertThat(customer.getFirstName()).isEqualTo("John");
        assertThat(customer.getLastName()).isEqualTo("Doe");
        assertThat(customer.getEmail()).isEqualTo("john@example.com");
        assertThat(customer.getPhone()).isNull();
        assertThat(customer.getAddress()).isNull();
    }

    @Test
    void shouldPreserveIdWhenUpdatingEntity() {
        // Given
        Customer customer = new Customer();
        customer.setCustomerId(42L);
        customer.setFirstName("Original");
        customer.setLastName("Name");
        customer.setEmail("original@example.com");

        CustomerUpdateDTO updateDTO = new CustomerUpdateDTO();
        updateDTO.setFirstName("Updated");
        updateDTO.setLastName("Name");
        updateDTO.setEmail("updated@example.com");
        updateDTO.setPhone("1111111111");
        updateDTO.setAddress("New Address");

        // When
        customerMapper.updateEntity(customer, updateDTO);

        // Then
        assertThat(customer.getCustomerId()).isEqualTo(42L); // ID must not change
        assertThat(customer.getFirstName()).isEqualTo("Updated");
    }
}
