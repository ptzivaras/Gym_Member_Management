package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.ClassTypeCreateDTO;
import com.example.GymCustomers.dto.ClassTypeResponseDTO;
import com.example.GymCustomers.mapper.ClassTypeMapper;
import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.repository.ClassTypeRepository;
import com.example.GymCustomers.service.ClassTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassTypeServiceImpl implements ClassTypeService {

    private final ClassTypeRepository classTypeRepository;
    private final ClassTypeMapper classTypeMapper;

    @Autowired
    public ClassTypeServiceImpl(ClassTypeRepository classTypeRepository, ClassTypeMapper classTypeMapper) {
        this.classTypeRepository = classTypeRepository;
        this.classTypeMapper = classTypeMapper;
    }

    @Override
    public List<ClassTypeResponseDTO> getAllClassTypes() {
        return classTypeRepository.findAll().stream()
                .map(classTypeMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClassTypeResponseDTO createClassType(ClassTypeCreateDTO dto) {
        ClassType classType = classTypeMapper.toEntity(dto);
        ClassType savedClassType = classTypeRepository.save(classType);
        return classTypeMapper.toResponseDTO(savedClassType);
    }

    @Override
    public Optional<ClassTypeResponseDTO> getClassTypeById(Long id) {
        return classTypeRepository.findById(id)
                .map(classTypeMapper::toResponseDTO);
    }

    @Override
    public Optional<ClassTypeResponseDTO> updateClassType(Long id, ClassTypeCreateDTO dto) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);
        
        if (classTypeOptional.isPresent()) {
            ClassType classType = classTypeOptional.get();
            classType.setTypeName(dto.getTypeName());
            
            ClassType updatedClassType = classTypeRepository.save(classType);
            return Optional.of(classTypeMapper.toResponseDTO(updatedClassType));
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
