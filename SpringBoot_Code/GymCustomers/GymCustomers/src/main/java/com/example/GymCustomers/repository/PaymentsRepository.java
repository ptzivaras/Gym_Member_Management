package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsRepository extends JpaRepository<Payments, Long> {
}
