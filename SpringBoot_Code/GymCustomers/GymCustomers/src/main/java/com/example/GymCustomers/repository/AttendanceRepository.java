package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Attendance;
import com.example.GymCustomers.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
