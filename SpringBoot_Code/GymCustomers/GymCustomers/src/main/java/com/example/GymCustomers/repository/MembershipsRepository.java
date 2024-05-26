package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Memberships;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipsRepository extends JpaRepository<Memberships, Long> {
}
