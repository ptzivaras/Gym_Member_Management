package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.ClassScheduleCreateDTO;
import com.example.GymCustomers.dto.ClassScheduleResponseDTO;

import java.util.List;

public interface ClassScheduleService {
    
    List<ClassScheduleResponseDTO> getAllClassSchedules();
    
    ClassScheduleResponseDTO createClassSchedule(ClassScheduleCreateDTO dto);
}
