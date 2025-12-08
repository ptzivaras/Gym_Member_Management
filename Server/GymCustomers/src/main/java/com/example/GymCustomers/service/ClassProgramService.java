package com.example.GymCustomers.service;

import com.example.GymCustomers.model.ClassProgram;

import java.util.List;
import java.util.Optional;

public interface ClassProgramService {
    
    List<ClassProgram> getAllClassPrograms();
    
    Optional<ClassProgram> getClassProgramById(Long id);
    
    Optional<ClassProgram> updateClassProgram(Long id, ClassProgram updatedProgram);
}
