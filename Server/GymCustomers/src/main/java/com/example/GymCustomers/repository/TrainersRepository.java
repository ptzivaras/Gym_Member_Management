package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Trainers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainersRepository extends JpaRepository<Trainers, Long> {
}
