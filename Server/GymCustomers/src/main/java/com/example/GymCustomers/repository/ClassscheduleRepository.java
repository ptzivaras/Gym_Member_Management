package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.ClassType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassscheduleRepository extends JpaRepository<Classschedule, Long> {
}

