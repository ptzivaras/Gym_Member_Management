package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.ClassTypeCreateDTO;
import com.example.GymCustomers.dto.ClassTypeResponseDTO;
import com.example.GymCustomers.model.ClassType;
import org.springframework.stereotype.Component;

@Component
public class ClassTypeMapper {

    public ClassType toEntity(ClassTypeCreateDTO dto) {
        ClassType classType = new ClassType();
        classType.setTypeName(dto.getTypeName());
        return classType;
    }

    public ClassTypeResponseDTO toResponseDTO(ClassType classType) {
        ClassTypeResponseDTO dto = new ClassTypeResponseDTO();
        dto.setTypeId(classType.getTypeId());
        dto.setTypeName(classType.getTypeName());
        return dto;
    }
}
