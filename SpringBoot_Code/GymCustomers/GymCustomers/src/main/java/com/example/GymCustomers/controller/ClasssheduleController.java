package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClasssheduleController {
    @Autowired
    private ClassscheduleRepository classScheduleRepository;

    @GetMapping("/classschedules")
    public List<Classschedule> getAllClassSchedules() {
        return classScheduleRepository.findAll();
    }
}
