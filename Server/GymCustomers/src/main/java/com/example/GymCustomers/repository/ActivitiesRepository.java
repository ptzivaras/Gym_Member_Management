package com.example.GymCustomers.repository;

import com.example.GymCustomers.model.Activities;
import com.example.GymCustomers.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivitiesRepository extends JpaRepository<Activities, Long> {
    //List<Activities> findByActivityName(String activityName);
}
