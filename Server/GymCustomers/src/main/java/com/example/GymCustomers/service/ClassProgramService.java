package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.ClassProgramCreateDTO;
import com.example.GymCustomers.dto.ClassProgramResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ClassProgramService {
    
    List<ClassProgramResponseDTO> getAllClassPrograms();
    
    ClassProgramResponseDTO createClassProgram(ClassProgramCreateDTO dto);
    
    Optional<ClassProgramResponseDTO> getClassProgramById(Long id);
    
    Optional<ClassProgramResponseDTO> updateClassProgram(Long id, ClassProgramCreateDTO dto);
}
