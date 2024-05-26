package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.TrainersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TrainersController {
    @Autowired
    private TrainersRepository trainerRepository;

    @GetMapping("/trainers")
    public List<Trainers> getAllTrainers() {
        return trainerRepository.findAll();
    }
}
