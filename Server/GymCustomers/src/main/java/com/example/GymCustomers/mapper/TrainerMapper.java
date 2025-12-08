package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import com.example.GymCustomers.model.Trainers;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Trainers entity and DTOs
 */
@Component
public class TrainerMapper {

    /**
     * Convert TrainerCreateDTO to Trainers entity
     */
    public Trainers toEntity(TrainerCreateDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Trainers trainer = new Trainers();
        trainer.setFirstName(dto.getFirstName());
        trainer.setLastName(dto.getLastName());
        trainer.setSpecialty(dto.getSpecialty());
        
        return trainer;
    }

    /**
     * Convert Trainers entity to TrainerResponseDTO
     */
    public TrainerResponseDTO toResponseDTO(Trainers trainer) {
        if (trainer == null) {
            return null;
        }
        
        return new TrainerResponseDTO(
            trainer.getTrainerId(),
            trainer.getFirstName(),
            trainer.getLastName(),
            trainer.getSpecialty()
        );
    }
}
