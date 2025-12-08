package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.ClassScheduleCreateDTO;
import com.example.GymCustomers.dto.ClassScheduleResponseDTO;
import com.example.GymCustomers.service.ClassScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ClassScheduleResponseDTO>> getAllClassSchedules() {
        List<ClassScheduleResponseDTO> schedules = classScheduleService.getAllClassSchedules();
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/classschedules")
    public ResponseEntity<ClassScheduleResponseDTO> createClassSchedule(@Valid @RequestBody ClassScheduleCreateDTO dto) {
        ClassScheduleResponseDTO created = classScheduleService.createClassSchedule(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
