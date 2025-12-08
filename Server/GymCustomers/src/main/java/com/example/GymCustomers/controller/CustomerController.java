package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.CustomerCreateDTO;
import com.example.GymCustomers.dto.CustomerResponseDTO;
import com.example.GymCustomers.dto.CustomerUpdateDTO;
import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Customer Management", description = "APIs for managing gym customers including CRUD operations")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
    
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Operation(summary = "Get all customers", description = "Retrieve a list of all registered gym customers")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of customers")
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers(){
        List<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }
    
    @Operation(summary = "Get customers (paginated)", description = "Retrieve customers with pagination and sorting support")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved paginated customers"),
        @ApiResponse(responseCode = "400", description = "Invalid pagination parameters", content = @Content)
    })
    @GetMapping("/customers/paginated")
    public ResponseEntity<PagedResponseDTO<CustomerResponseDTO>> getCustomersPaginated(
            @Parameter(description = "Page number (zero-based)", example = "0") 
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Number of items per page", example = "10") 
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field", example = "firstName") 
            @RequestParam(defaultValue = "customerId") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)", example = "asc") 
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        PagedResponseDTO<CustomerResponseDTO> customers = customerService.getAllCustomersPaginated(pageable);
        return ResponseEntity.ok(customers);
    }

    @Operation(summary = "Create new customer", description = "Register a new customer in the gym management system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Customer successfully created", 
                    content = @Content(schema = @Schema(implementation = CustomerResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PostMapping("/customers")
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerCreateDTO customerDTO) {
        CustomerResponseDTO createdCustomer = customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @Operation(summary = "Get customer by ID", description = "Retrieve a specific customer by their unique ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer found"),
        @ApiResponse(responseCode = "404", description = "Customer not found", content = @Content)
    })
    @GetMapping("/customers/{customerId}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(
            @Parameter(description = "Customer ID", required = true) @PathVariable Long customerId) {
        Optional<CustomerResponseDTO> customer = customerService.getCustomerById(customerId);
        return customer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Update customer", description = "Update an existing customer's information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer successfully updated"),
        @ApiResponse(responseCode = "404", description = "Customer not found", content = @Content),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PutMapping("/customers/{customerId}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(
            @Parameter(description = "Customer ID", required = true) @PathVariable Long customerId, 
            @Valid @RequestBody CustomerUpdateDTO customerDTO) {
        Optional<CustomerResponseDTO> updatedCustomer = customerService.updateCustomer(customerId, customerDTO);
        return updatedCustomer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete customer", description = "Remove a customer from the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Customer successfully deleted"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    @DeleteMapping("/customers/{customerId}")
    public ResponseEntity<Void> deleteCustomer(
            @Parameter(description = "Customer ID", required = true) @PathVariable Long customerId) {
        boolean deleted = customerService.deleteCustomer(customerId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
