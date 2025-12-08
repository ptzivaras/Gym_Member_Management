package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class CustomerControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        customerRepository.deleteAll();
    }

    @Test
    void shouldGetAllCustomers() throws Exception {
        // Given
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");
        customerRepository.save(customer);

        // When & Then
        mockMvc.perform(get("/api/v1/customers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].firstName").value("John"))
                .andExpect(jsonPath("$[0].email").value("john.doe@example.com"));
    }

    @Test
    void shouldGetCustomersPaginated() throws Exception {
        // Given - Create 3 customers
        for (int i = 1; i <= 3; i++) {
            Customer customer = new Customer();
            customer.setFirstName("Customer" + i);
            customer.setLastName("Test");
            customer.setEmail("customer" + i + "@example.com");
            customer.setPhone("123456789" + i);
            customer.setAddress("Address " + i);
            customerRepository.save(customer);
        }

        // When & Then - Request page 0 with size 2
        mockMvc.perform(get("/api/v1/customers/paginated")
                        .param("page", "0")
                        .param("size", "2")
                        .param("sortBy", "firstName")
                        .param("sortDir", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.pageNumber").value(0))
                .andExpect(jsonPath("$.pageSize").value(2))
                .andExpect(jsonPath("$.totalElements").value(3))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false))
                .andExpect(jsonPath("$.hasNext").value(true));
    }

    @Test
    void shouldCreateCustomer() throws Exception {
        // Given
        CustomerCreateDTO createDTO = new CustomerCreateDTO();
        createDTO.setFirstName("Jane");
        createDTO.setLastName("Smith");
        createDTO.setEmail("jane.smith@example.com");
        createDTO.setPhone("0987654321");
        createDTO.setAddress("456 Oak Ave");

        // When & Then
        mockMvc.perform(post("/api/v1/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("Jane"))
                .andExpect(jsonPath("$.lastName").value("Smith"))
                .andExpect(jsonPath("$.email").value("jane.smith@example.com"))
                .andExpect(jsonPath("$.customerId").exists());
    }

    @Test
    void shouldReturnBadRequestWhenCreateCustomerWithInvalidData() throws Exception {
        // Given - Invalid DTO (missing required fields)
        CustomerCreateDTO createDTO = new CustomerCreateDTO();
        createDTO.setFirstName(""); // Empty first name (violates @NotBlank)
        createDTO.setEmail("invalid-email"); // Invalid email format

        // When & Then
        mockMvc.perform(post("/api/v1/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldGetCustomerById() throws Exception {
        // Given
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");
        Customer savedCustomer = customerRepository.save(customer);

        // When & Then
        mockMvc.perform(get("/api/v1/customers/{id}", savedCustomer.getCustomerId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerId").value(savedCustomer.getCustomerId()))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    void shouldReturn404WhenCustomerNotFound() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/customers/{id}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateCustomer() throws Exception {
        // Given
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");
        Customer savedCustomer = customerRepository.save(customer);

        CustomerUpdateDTO updateDTO = new CustomerUpdateDTO();
        updateDTO.setFirstName("Jane");
        updateDTO.setLastName("Smith");
        updateDTO.setEmail("jane.smith@example.com");
        updateDTO.setPhone("0987654321");
        updateDTO.setAddress("456 Oak Ave");

        // When & Then
        mockMvc.perform(put("/api/v1/customers/{id}", savedCustomer.getCustomerId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerId").value(savedCustomer.getCustomerId()))
                .andExpect(jsonPath("$.firstName").value("Jane"))
                .andExpect(jsonPath("$.email").value("jane.smith@example.com"));
    }

    @Test
    void shouldReturn404WhenUpdateNonExistentCustomer() throws Exception {
        // Given
        CustomerUpdateDTO updateDTO = new CustomerUpdateDTO();
        updateDTO.setFirstName("Jane");
        updateDTO.setLastName("Smith");
        updateDTO.setEmail("jane.smith@example.com");
        updateDTO.setPhone("0987654321");
        updateDTO.setAddress("456 Oak Ave");

        // When & Then
        mockMvc.perform(put("/api/v1/customers/{id}", 999L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteCustomer() throws Exception {
        // Given
        Customer customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPhone("1234567890");
        customer.setAddress("123 Main St");
        Customer savedCustomer = customerRepository.save(customer);

        // When & Then
        mockMvc.perform(delete("/api/v1/customers/{id}", savedCustomer.getCustomerId()))
                .andExpect(status().isNoContent());

        // Verify deletion
        mockMvc.perform(get("/api/v1/customers/{id}", savedCustomer.getCustomerId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn404WhenDeleteNonExistentCustomer() throws Exception {
        // When & Then
        mockMvc.perform(delete("/api/v1/customers/{id}", 999L))
                .andExpect(status().isNotFound());
    }
}
