package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import com.example.GymCustomers.mapper.TrainerMapper;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.TrainersRepository;
import com.example.GymCustomers.service.TrainerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {

    private static final Logger logger = LoggerFactory.getLogger(TrainerServiceImpl.class);

    private final TrainersRepository trainersRepository;
    private final TrainerMapper trainerMapper;

    @Autowired
    public TrainerServiceImpl(TrainersRepository trainersRepository, TrainerMapper trainerMapper) {
        this.trainersRepository = trainersRepository;
        this.trainerMapper = trainerMapper;
    }

    @Override
    public List<TrainerResponseDTO> getAllTrainers() {
        logger.info("Fetching all trainers");
        List<TrainerResponseDTO> trainers = trainersRepository.findAll().stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
        logger.info("Retrieved {} trainers", trainers.size());
        return trainers;
    }
    
    @Override
    public PagedResponseDTO<TrainerResponseDTO> getAllTrainersPaginated(Pageable pageable) {
        logger.info("Fetching trainers - Page: {}, Size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Trainers> trainerPage = trainersRepository.findAll(pageable);
        
        List<TrainerResponseDTO> content = trainerPage.getContent().stream()
                .map(trainerMapper::toResponseDTO)
                .collect(Collectors.toList());
        
        logger.info("Retrieved {} trainers out of {} total", content.size(), trainerPage.getTotalElements());
        
        return new PagedResponseDTO<>(
                content,
                trainerPage.getNumber(),
                trainerPage.getSize(),
                trainerPage.getTotalElements(),
                trainerPage.getTotalPages()
        );
    }

    @Override
    public TrainerResponseDTO createTrainer(TrainerCreateDTO dto) {
        logger.info("Creating new trainer: {} {}", dto.getFirstName(), dto.getLastName());
        Trainers trainer = trainerMapper.toEntity(dto);
        Trainers savedTrainer = trainersRepository.save(trainer);
        logger.info("Trainer created successfully with ID: {}", savedTrainer.getTrainerId());
        return trainerMapper.toResponseDTO(savedTrainer);
    }

    @Override
    public Optional<TrainerResponseDTO> getTrainerById(Long id) {
        logger.info("Fetching trainer with ID: {}", id);
        Optional<TrainerResponseDTO> trainer = trainersRepository.findById(id)
                .map(trainerMapper::toResponseDTO);
        
        if (trainer.isPresent()) {
            logger.info("Trainer found with ID: {}", id);
        } else {
            logger.warn("Trainer not found with ID: {}", id);
        }
        
        return trainer;
    }

    @Override
    public boolean deleteTrainer(Long id) {
        logger.info("Attempting to delete trainer with ID: {}", id);
        if (trainersRepository.existsById(id)) {
            trainersRepository.deleteById(id);
            logger.info("Trainer deleted successfully with ID: {}", id);
            return true;
        }
        logger.warn("Cannot delete - Trainer not found with ID: {}", id);
        return false;
    }
}
