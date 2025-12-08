package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.TrainersRepository;
import com.example.GymCustomers.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {

    private final TrainersRepository trainersRepository;

    @Autowired
    public TrainerServiceImpl(TrainersRepository trainersRepository) {
        this.trainersRepository = trainersRepository;
    }

    @Override
    public List<Trainers> getAllTrainers() {
        return trainersRepository.findAll();
    }

    @Override
    public Trainers createTrainer(Trainers trainer) {
        return trainersRepository.save(trainer);
    }

    @Override
    public Optional<Trainers> getTrainerById(Long id) {
        return trainersRepository.findById(id);
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
