package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.ClassScheduleCreateDTO;
import com.example.GymCustomers.dto.ClassScheduleResponseDTO;
import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.Trainers;
import org.springframework.stereotype.Component;

@Component
public class ClassScheduleMapper {

    public Classschedule toEntity(ClassScheduleCreateDTO dto, ClassType classType, Trainers trainer) {
        Classschedule schedule = new Classschedule();
        schedule.setClassName(dto.getClassName());
        schedule.setDayOfWeek(dto.getDayOfWeek());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setViewtype(classType);
        schedule.setMtrainerId(trainer);
        return schedule;
    }

    public ClassScheduleResponseDTO toResponseDTO(Classschedule schedule) {
        ClassScheduleResponseDTO dto = new ClassScheduleResponseDTO();
        dto.setClassId(schedule.getClassId());
        dto.setClassName(schedule.getClassName());
        dto.setDayOfWeek(schedule.getDayOfWeek());
        dto.setStartTime(schedule.getStartTime());
        dto.setEndTime(schedule.getEndTime());
        dto.setClassTypeId(schedule.getViewtype().getTypeId());
        dto.setClassTypeName(schedule.getViewtype().getTypeName());
        dto.setTrainerId(schedule.getMtrainerId().getTrainerId());
        dto.setTrainerName(schedule.getMtrainerId().getFirstName() + " " + schedule.getMtrainerId().getLastName());
        return dto;
    }
}
