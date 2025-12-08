package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.ClassProgramCreateDTO;
import com.example.GymCustomers.dto.ClassProgramResponseDTO;
import com.example.GymCustomers.mapper.ClassProgramMapper;
import com.example.GymCustomers.model.ClassProgram;
import com.example.GymCustomers.repository.ClassProgramRepository;
import com.example.GymCustomers.service.ClassProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassProgramServiceImpl implements ClassProgramService {

    private final ClassProgramRepository classProgramRepository;
    private final ClassProgramMapper classProgramMapper;

    @Autowired
    public ClassProgramServiceImpl(ClassProgramRepository classProgramRepository, ClassProgramMapper classProgramMapper) {
        this.classProgramRepository = classProgramRepository;
        this.classProgramMapper = classProgramMapper;
    }

    @Override
    public List<ClassProgramResponseDTO> getAllClassPrograms() {
        return classProgramRepository.findAll().stream()
                .map(classProgramMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClassProgramResponseDTO createClassProgram(ClassProgramCreateDTO dto) {
        ClassProgram classProgram = classProgramMapper.toEntity(dto);
        ClassProgram savedProgram = classProgramRepository.save(classProgram);
        return classProgramMapper.toResponseDTO(savedProgram);
    }

    @Override
    public Optional<ClassProgramResponseDTO> getClassProgramById(Long id) {
        return classProgramRepository.findById(id)
                .map(classProgramMapper::toResponseDTO);
    }

    @Override
    public Optional<ClassProgramResponseDTO> updateClassProgram(Long id, ClassProgramCreateDTO dto) {
        Optional<ClassProgram> existingProgramOptional = classProgramRepository.findById(id);

        if (existingProgramOptional.isPresent()) {
            ClassProgram existingProgram = existingProgramOptional.get();
            existingProgram.setClassName(dto.getClassName());
            existingProgram.setDayOfWeek(dto.getDayOfWeek());
            existingProgram.setStartTime(dto.getStartTime());
            existingProgram.setEndTime(dto.getEndTime());
            existingProgram.setTrainerName(dto.getTrainerName());

            ClassProgram updatedProgram = classProgramRepository.save(existingProgram);
            return Optional.of(classProgramMapper.toResponseDTO(updatedProgram));
        }

        return Optional.empty();
    }
}
