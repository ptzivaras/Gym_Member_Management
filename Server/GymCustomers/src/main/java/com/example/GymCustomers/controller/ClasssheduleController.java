package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.service.ClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClasssheduleController {

    private final ClassScheduleService classScheduleService;

    @Autowired
    public ClasssheduleController(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @GetMapping("/classschedules")
    public List<Classschedule> getAllClassSchedules() {
        return classScheduleService.getAllClassSchedules();
    }
}
