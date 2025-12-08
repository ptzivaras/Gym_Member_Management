package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import com.example.GymCustomers.mapper.TrainerMapper;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.TrainersRepository;
import com.example.GymCustomers.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {

    private final TrainersRepository trainersRepository;
    private final TrainerMapper trainerMapper;

    @Autowired
    public TrainerServiceImpl(TrainersRepository trainersRepository, TrainerMapper trainerMapper) {
        this.trainersRepository = trainersRepository;
        this.trainerMapper = trainerMapper;
    }

    @Override
    public List<TrainerResponseDTO> getAllTrainers() {
        return trainersRepository.findAll().stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TrainerResponseDTO createTrainer(TrainerCreateDTO dto) {
        Trainers trainer = trainerMapper.toEntity(dto);
        Trainers savedTrainer = trainersRepository.save(trainer);
        return trainerMapper.toResponseDTO(savedTrainer);
    }

    @Override
    public Optional<TrainerResponseDTO> getTrainerById(Long id) {
        return trainersRepository.findById(id)
                .map(trainerMapper::toResponseDTO);
    }

    @Override
    public boolean deleteTrainer(Long id) {
        if (trainersRepository.existsById(id)) {
            trainersRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
