package com.example.GymCustomers.service;

import com.example.GymCustomers.model.Trainers;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    
    List<Trainers> getAllTrainers();
    
    Trainers createTrainer(Trainers trainer);
    
    Optional<Trainers> getTrainerById(Long id);
    
    boolean deleteTrainer(Long id);
}
