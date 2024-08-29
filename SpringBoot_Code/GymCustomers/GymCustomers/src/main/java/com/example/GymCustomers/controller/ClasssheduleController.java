package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.ClassTypeRepository;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import com.example.GymCustomers.repository.TrainersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.List;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClasssheduleController {

    private static final Logger LOGGER = Logger.getLogger(ClasssheduleController.class.getName());

    @Autowired
    private ClassscheduleRepository classScheduleRepository;

    @Autowired
    private ClassTypeRepository classTypeRepository;

    @Autowired
    private TrainersRepository trainersRepository;

    @GetMapping("/classschedules")
    public List<Classschedule> getAllClassSchedules() {
        return classScheduleRepository.findAll();
    }

    @PutMapping("/classschedules/{id}")
    public ResponseEntity<Classschedule> updateClassSchedule(
            @PathVariable Long id,
            @RequestBody Classschedule updatedSchedule) {

        // Remove header validation for testing

        Optional<Classschedule> existingScheduleOptional = classScheduleRepository.findById(id);

        if (!existingScheduleOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Classschedule existingSchedule = existingScheduleOptional.get();

        // Update fields
        if (updatedSchedule.getClassName() != null) {
            existingSchedule.setClassName(updatedSchedule.getClassName());
        }
        if (updatedSchedule.getDayOfWeek() != null) {
            existingSchedule.setDayOfWeek(updatedSchedule.getDayOfWeek());
        }
        if (updatedSchedule.getStartTime() != null) {
            existingSchedule.setStartTime(updatedSchedule.getStartTime());
        }
        if (updatedSchedule.getEndTime() != null) {
            existingSchedule.setEndTime(updatedSchedule.getEndTime());
        }

        // Save and return updated entity
        Classschedule savedSchedule = classScheduleRepository.save(existingSchedule);
        return ResponseEntity.ok(savedSchedule);
    }


}
