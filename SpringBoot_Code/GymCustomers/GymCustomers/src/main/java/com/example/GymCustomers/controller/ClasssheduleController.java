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
    @PostMapping("/classschedules")
    public ResponseEntity<Classschedule> createClassSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(scheduleRequest.getClassTypeId());
        Optional<Trainers> trainerOptional = trainersRepository.findById(scheduleRequest.getTrainerId());

        if (!classTypeOptional.isPresent() || !trainerOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Classschedule classSchedule = new Classschedule();
        classSchedule.setClassName(scheduleRequest.getClassName());
        classSchedule.setDayOfWeek(scheduleRequest.getDayOfWeek());
        classSchedule.setStartTime(scheduleRequest.getStartTime());
        classSchedule.setEndTime(scheduleRequest.getEndTime());
        classSchedule.setViewtype(classTypeOptional.get());
        classSchedule.setMtrainerId(trainerOptional.get());

        Classschedule savedSchedule = classScheduleRepository.save(classSchedule);
        return ResponseEntity.ok(savedSchedule);
    }*/
/*
    @PostMapping("/classschedules/save")
    public ResponseEntity<Classschedule> createClassSchedule(@RequestBody ScheduleChange scheduleChange) {
        System.out.println("Received ScheduleChange: " + scheduleChange);
        System.out.println("ClassTypeId: " + scheduleChange.getClassTypeId());
        System.out.println("TrainerId: " + scheduleChange.getTrainerId());

        Optional<ClassType> classTypeOptional = classTypeRepository.findById(scheduleChange.getClassTypeId());
        Optional<Trainers> trainerOptional = trainersRepository.findById(scheduleChange.getTrainerId());

        if (!classTypeOptional.isPresent() || !trainerOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Classschedule classSchedule = new Classschedule();
        classSchedule.setClassName(scheduleChange.getClassName());
        classSchedule.setDayOfWeek(scheduleChange.getDayOfWeek());
        classSchedule.setStartTime(scheduleChange.getStartTime());
        classSchedule.setEndTime(scheduleChange.getEndTime());
        classSchedule.setViewtype(classTypeOptional.get());
        classSchedule.setMtrainerId(trainerOptional.get());

        Classschedule savedSchedule = classScheduleRepository.save(classSchedule);
        return ResponseEntity.ok(savedSchedule);
    }*/

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

}
