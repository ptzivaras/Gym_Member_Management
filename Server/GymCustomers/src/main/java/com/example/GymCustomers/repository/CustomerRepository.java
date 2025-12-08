package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    //@Query("SELECT c FROM Customer c WHERE c.firstName = :firstName")
    //List<Customer> findCustomersByFirstName(String firstName);
    //or use a build in method somehow
}
