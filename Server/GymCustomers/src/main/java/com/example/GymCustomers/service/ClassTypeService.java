package com.example.GymCustomers.service;

import com.example.GymCustomers.model.ClassType;

import java.util.List;
import java.util.Optional;

public interface ClassTypeService {
    
    List<ClassType> getAllClassTypes();
    
    ClassType createClassType(ClassType classType);
    
    Optional<ClassType> getClassTypeById(Long id);
    
    Optional<ClassType> updateClassType(Long id, ClassType classTypeDetails);
    
    boolean deleteClassType(Long id);
}
