package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.repository.ClassTypeRepository;
import com.example.GymCustomers.service.ClassTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClassTypeServiceImpl implements ClassTypeService {

    private final ClassTypeRepository classTypeRepository;

    @Autowired
    public ClassTypeServiceImpl(ClassTypeRepository classTypeRepository) {
        this.classTypeRepository = classTypeRepository;
    }

    @Override
    public List<ClassType> getAllClassTypes() {
        return classTypeRepository.findAll();
    }

    @Override
    public ClassType createClassType(ClassType classType) {
        return classTypeRepository.save(classType);
    }

    @Override
    public Optional<ClassType> getClassTypeById(Long id) {
        return classTypeRepository.findById(id);
    }

    @Override
    public Optional<ClassType> updateClassType(Long id, ClassType classTypeDetails) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);
        
        if (classTypeOptional.isPresent()) {
            ClassType classType = classTypeOptional.get();
            classType.setTypeName(classTypeDetails.getTypeName());
            
            ClassType updatedClassType = classTypeRepository.save(classType);
            return Optional.of(updatedClassType);
        }
        
        return Optional.empty();
    }

    @Override
    public boolean deleteClassType(Long id) {
        if (classTypeRepository.existsById(id)) {
            classTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
