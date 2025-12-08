package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    
    List<TrainerResponseDTO> getAllTrainers();
    
    PagedResponseDTO<TrainerResponseDTO> getAllTrainersPaginated(Pageable pageable);
    
    TrainerResponseDTO createTrainer(TrainerCreateDTO dto);
    
    Optional<TrainerResponseDTO> getTrainerById(Long id);
    
    boolean deleteTrainer(Long id);
}
