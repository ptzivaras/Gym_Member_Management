package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.ClassProgramCreateDTO;
import com.example.GymCustomers.dto.ClassProgramResponseDTO;
import com.example.GymCustomers.model.ClassProgram;
import org.springframework.stereotype.Component;

@Component
public class ClassProgramMapper {

    public ClassProgram toEntity(ClassProgramCreateDTO dto) {
        ClassProgram classProgram = new ClassProgram();
        classProgram.setClassName(dto.getClassName());
        classProgram.setDayOfWeek(dto.getDayOfWeek());
        classProgram.setStartTime(dto.getStartTime());
        classProgram.setEndTime(dto.getEndTime());
        classProgram.setTrainerName(dto.getTrainerName());
        return classProgram;
    }

    public ClassProgramResponseDTO toResponseDTO(ClassProgram classProgram) {
        ClassProgramResponseDTO dto = new ClassProgramResponseDTO();
        dto.setClassId(classProgram.getClassId());
        dto.setClassName(classProgram.getClassName());
        dto.setDayOfWeek(classProgram.getDayOfWeek());
        dto.setStartTime(classProgram.getStartTime());
        dto.setEndTime(classProgram.getEndTime());
        dto.setTrainerName(classProgram.getTrainerName());
        return dto;
    }
}
