package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.ClassTypeCreateDTO;
import com.example.GymCustomers.dto.ClassTypeResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ClassTypeService {
    
    List<ClassTypeResponseDTO> getAllClassTypes();
    
    ClassTypeResponseDTO createClassType(ClassTypeCreateDTO dto);
    
    Optional<ClassTypeResponseDTO> getClassTypeById(Long id);
    
    Optional<ClassTypeResponseDTO> updateClassType(Long id, ClassTypeCreateDTO dto);
    
    boolean deleteClassType(Long id);
}
