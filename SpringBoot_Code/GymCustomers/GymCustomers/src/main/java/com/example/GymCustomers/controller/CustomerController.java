package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(){
        // return all Customers to client
        return customerRepository.findAll();
    }

    @PostMapping("/customers")
    public Customer createCustomer(@RequestBody Customer customer) {
        // Save the new customer to the database
        return customerRepository.save(customer);
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long customerId) {
        // Fetch a customer by ID from the database
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        return customerOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //code is more robust, follows RESTful conventions, and handles errors TODO:check JPA Hibernate
    @PutMapping("/customers/{customerId}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long customerId, @RequestBody Customer updatedCustomerData) {
        // Fetch the existing customer from the database
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        // Check if the customer exists
        if (customerOptional.isPresent()) {
            // Update the existing customer with the new data
            Customer existingCustomer = customerOptional.get();
            existingCustomer.setFirstName(updatedCustomerData.getFirstName());
            existingCustomer.setLastName(updatedCustomerData.getLastName());
            existingCustomer.setEmail(updatedCustomerData.getEmail());
            existingCustomer.setPhone(updatedCustomerData.getPhone());
            existingCustomer.setAddress(updatedCustomerData.getAddress());

            // Save the updated customer to the database
            Customer updatedCustomer = customerRepository.save(existingCustomer);

            // Return the updated customer as a response
            return ResponseEntity.ok(updatedCustomer);
        } else {
            // If the customer does not exist, return a NOT FOUND response
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/customers/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long customerId) {
        // Delete a customer by ID from the database
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
