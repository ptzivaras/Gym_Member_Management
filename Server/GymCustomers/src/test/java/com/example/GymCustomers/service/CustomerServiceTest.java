package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.mapper.CustomerMapper;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.service.impl.CustomerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;
    private CustomerCreateDTO createDTO;
    private CustomerUpdateDTO updateDTO;
    private CustomerResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        // Setup test data
        customer = new Customer();
        customer.setCustomerId(1L);
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");

        createDTO = new CustomerCreateDTO();
        createDTO.setFirstName("John");
        createDTO.setLastName("Doe");
        createDTO.setEmail("john.doe@example.com");
        createDTO.setPhone("1234567890");
        createDTO.setAddress("123 Main St");

        updateDTO = new CustomerUpdateDTO();
        updateDTO.setFirstName("John");
        updateDTO.setLastName("Smith");
        updateDTO.setEmail("john.smith@example.com");
        updateDTO.setPhone("0987654321");
        updateDTO.setAddress("456 Oak Ave");

        responseDTO = new CustomerResponseDTO();
        responseDTO.setCustomerId(1L);
        responseDTO.setFirstName("John");
        responseDTO.setLastName("Doe");
        responseDTO.setEmail("john.doe@example.com");
        responseDTO.setPhone("1234567890");
        responseDTO.setAddress("123 Main St");
    }

    @Test
    void shouldGetAllCustomers() {
        // Given
        List<Customer> customers = Arrays.asList(customer);
        when(customerRepository.findAll()).thenReturn(customers);
        when(customerMapper.toResponseDTO(customer)).thenReturn(responseDTO);

        // When
        List<CustomerResponseDTO> result = customerService.getAllCustomers();

        // Then
        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getEmail()).isEqualTo("john.doe@example.com");
        verify(customerRepository, times(1)).findAll();
        verify(customerMapper, times(1)).toResponseDTO(customer);
    }

    @Test
    void shouldGetAllCustomersPaginated() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        Page<Customer> customerPage = new PageImpl<>(Arrays.asList(customer), pageable, 1);
        
        when(customerRepository.findAll(pageable)).thenReturn(customerPage);
        when(customerMapper.toResponseDTO(customer)).thenReturn(responseDTO);

        // When
        PagedResponseDTO<CustomerResponseDTO> result = customerService.getAllCustomersPaginated(pageable);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getTotalPages()).isEqualTo(1);
        assertThat(result.isFirst()).isTrue();
        assertThat(result.isLast()).isTrue();
        verify(customerRepository, times(1)).findAll(pageable);
    }

    @Test
    void shouldCreateCustomer() {
        // Given
        when(customerMapper.toEntity(createDTO)).thenReturn(customer);
        when(customerRepository.save(customer)).thenReturn(customer);
        when(customerMapper.toResponseDTO(customer)).thenReturn(responseDTO);

        // When
        CustomerResponseDTO result = customerService.createCustomer(createDTO);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getFirstName()).isEqualTo("John");
        assertThat(result.getEmail()).isEqualTo("john.doe@example.com");
        verify(customerMapper, times(1)).toEntity(createDTO);
        verify(customerRepository, times(1)).save(customer);
        verify(customerMapper, times(1)).toResponseDTO(customer);
    }

    @Test
    void shouldGetCustomerById() {
        // Given
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(customerMapper.toResponseDTO(customer)).thenReturn(responseDTO);

        // When
        Optional<CustomerResponseDTO> result = customerService.getCustomerById(1L);

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().getCustomerId()).isEqualTo(1L);
        assertThat(result.get().getEmail()).isEqualTo("john.doe@example.com");
        verify(customerRepository, times(1)).findById(1L);
        verify(customerMapper, times(1)).toResponseDTO(customer);
    }

    @Test
    void shouldReturnEmptyWhenCustomerNotFoundById() {
        // Given
        when(customerRepository.findById(999L)).thenReturn(Optional.empty());

        // When
        Optional<CustomerResponseDTO> result = customerService.getCustomerById(999L);

        // Then
        assertThat(result).isEmpty();
        verify(customerRepository, times(1)).findById(999L);
        verify(customerMapper, never()).toResponseDTO(any());
    }

    @Test
    void shouldUpdateCustomer() {
        // Given
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        doNothing().when(customerMapper).updateEntity(customer, updateDTO);
        when(customerRepository.save(customer)).thenReturn(customer);
        when(customerMapper.toResponseDTO(customer)).thenReturn(responseDTO);

        // When
        Optional<CustomerResponseDTO> result = customerService.updateCustomer(1L, updateDTO);

        // Then
        assertThat(result).isPresent();
        verify(customerRepository, times(1)).findById(1L);
        verify(customerMapper, times(1)).updateEntity(customer, updateDTO);
        verify(customerRepository, times(1)).save(customer);
        verify(customerMapper, times(1)).toResponseDTO(customer);
    }

    @Test
    void shouldReturnEmptyWhenUpdateCustomerNotFound() {
        // Given
        when(customerRepository.findById(999L)).thenReturn(Optional.empty());

        // When
        Optional<CustomerResponseDTO> result = customerService.updateCustomer(999L, updateDTO);

        // Then
        assertThat(result).isEmpty();
        verify(customerRepository, times(1)).findById(999L);
        verify(customerMapper, never()).updateEntity(any(), any());
        verify(customerRepository, never()).save(any());
    }

    @Test
    void shouldDeleteCustomer() {
        // Given
        when(customerRepository.existsById(1L)).thenReturn(true);
        doNothing().when(customerRepository).deleteById(1L);

        // When
        boolean result = customerService.deleteCustomer(1L);

        // Then
        assertThat(result).isTrue();
        verify(customerRepository, times(1)).existsById(1L);
        verify(customerRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldReturnFalseWhenDeleteCustomerNotFound() {
        // Given
        when(customerRepository.existsById(999L)).thenReturn(false);

        // When
        boolean result = customerService.deleteCustomer(999L);

        // Then
        assertThat(result).isFalse();
        verify(customerRepository, times(1)).existsById(999L);
        verify(customerRepository, never()).deleteById(any());
    }
}
