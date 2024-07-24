package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.ClassType;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.GymCustomers.model.ClassType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ClassTypeRepository extends JpaRepository<ClassType, Long> {
}
