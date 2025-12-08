package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.service.TrainerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TrainersController {
    
    private final TrainerService trainerService;

    @Autowired
    public TrainersController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping("/trainers")
    public List<Trainers> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @PostMapping("/trainers")
    public ResponseEntity<Trainers> createTrainers(@Valid @RequestBody Trainers trainer) {
        Trainers createdTrainer = trainerService.createTrainer(trainer);
        return new ResponseEntity<>(createdTrainer, HttpStatus.CREATED);
    }

    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        boolean deleted = trainerService.deleteTrainer(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
