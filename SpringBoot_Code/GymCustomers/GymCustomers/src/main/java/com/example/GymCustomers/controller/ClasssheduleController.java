package com.example.GymCustomers.controller;

//import com.example.GymCustomers.dto.ScheduleRequest;
import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.model.ScheduleChange;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.ClassTypeRepository;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import com.example.GymCustomers.repository.TrainersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClasssheduleController {
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


    /*
    Todo: Delete this comments but modify it for Patch/Put before
    @PostMapping("/classschedules/save")
    public ResponseEntity<Classschedule> createClassSchedule(@RequestBody Classschedule classSchedule) {
        if (classSchedule.getViewtype() == null || classSchedule.getMtrainerId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Ensure the IDs are not null
        Long classTypeId = classSchedule.getViewtype().getTypeId();
        Long trainerId = classSchedule.getMtrainerId().getTrainerId();

        if (classTypeId == null || trainerId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<ClassType> classTypeOptional = classTypeRepository.findById(classSchedule.getViewtype().getTypeId());
        Optional<Trainers> trainerOptional = trainersRepository.findById(classSchedule.getMtrainerId().getTrainerId());

        if (!classTypeOptional.isPresent() || !trainerOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        classSchedule.setViewtype(classTypeOptional.get());
        classSchedule.setMtrainerId(trainerOptional.get());

        Classschedule savedSchedule = classScheduleRepository.save(classSchedule);
        return ResponseEntity.ok(savedSchedule);
    }
    */

    //Todo: Patch is correct but its ok put is fine
    @PutMapping("/classschedules/{id}")
    public ResponseEntity<Classschedule> updateClassSchedule(@PathVariable Long id, @RequestBody Classschedule updatedSchedule) {
        Optional<Classschedule> existingScheduleOptional = classScheduleRepository.findById(id);

        if (!existingScheduleOptional.isPresent()) {
            return ResponseEntity.notFound().build(); // If the entry doesn't exist, return 404
        }

        Classschedule existingSchedule = existingScheduleOptional.get();

        // Update the fields as needed
        existingSchedule.setClassName(updatedSchedule.getClassName());
        existingSchedule.setDayOfWeek(updatedSchedule.getDayOfWeek());
        existingSchedule.setStartTime(updatedSchedule.getStartTime());
        existingSchedule.setEndTime(updatedSchedule.getEndTime());

        // Update related entities like viewtype and mtrainerId
        if (updatedSchedule.getViewtype() != null) {
            existingSchedule.setViewtype(classTypeRepository.findById(updatedSchedule.getViewtype().getTypeId()).orElse(null));
        }
        if (updatedSchedule.getMtrainerId() != null) {
            existingSchedule.setMtrainerId(trainersRepository.findById(updatedSchedule.getMtrainerId().getTrainerId()).orElse(null));
        }

        Classschedule savedSchedule = classScheduleRepository.save(existingSchedule);
        return ResponseEntity.ok(savedSchedule);
    }



}
