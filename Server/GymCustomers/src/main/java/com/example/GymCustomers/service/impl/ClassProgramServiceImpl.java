package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.ClassProgram;
import com.example.GymCustomers.repository.ClassProgramRepository;
import com.example.GymCustomers.service.ClassProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClassProgramServiceImpl implements ClassProgramService {

    private final ClassProgramRepository classProgramRepository;

    @Autowired
    public ClassProgramServiceImpl(ClassProgramRepository classProgramRepository) {
        this.classProgramRepository = classProgramRepository;
    }

    @Override
    public List<ClassProgram> getAllClassPrograms() {
        return classProgramRepository.findAll();
    }

    @Override
    public Optional<ClassProgram> getClassProgramById(Long id) {
        return classProgramRepository.findById(id);
    }

    @Override
    public Optional<ClassProgram> updateClassProgram(Long id, ClassProgram updatedProgram) {
        Optional<ClassProgram> existingProgramOptional = classProgramRepository.findById(id);

        if (existingProgramOptional.isPresent()) {
            ClassProgram existingProgram = existingProgramOptional.get();

            if (updatedProgram.getClassName() != null) {
                existingProgram.setClassName(updatedProgram.getClassName());
            }
            if (updatedProgram.getDayOfWeek() != null) {
                existingProgram.setDayOfWeek(updatedProgram.getDayOfWeek());
            }
            if (updatedProgram.getStartTime() != null) {
                existingProgram.setStartTime(updatedProgram.getStartTime());
            }
            if (updatedProgram.getEndTime() != null) {
                existingProgram.setEndTime(updatedProgram.getEndTime());
            }
            if (updatedProgram.getTrainerName() != null) {
                existingProgram.setTrainerName(updatedProgram.getTrainerName());
            }

            ClassProgram savedProgram = classProgramRepository.save(existingProgram);
            return Optional.of(savedProgram);
        }

        return Optional.empty();
    }
}
