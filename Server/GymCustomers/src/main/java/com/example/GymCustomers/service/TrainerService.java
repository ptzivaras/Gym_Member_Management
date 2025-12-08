package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    
    List<TrainerResponseDTO> getAllTrainers();
    
    TrainerResponseDTO createTrainer(TrainerCreateDTO dto);
    
    Optional<TrainerResponseDTO> getTrainerById(Long id);
    
    boolean deleteTrainer(Long id);
}
