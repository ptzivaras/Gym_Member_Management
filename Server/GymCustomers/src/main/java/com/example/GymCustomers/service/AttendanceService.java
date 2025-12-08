package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.AttendanceCreateDTO;
import com.example.GymCustomers.dto.AttendanceResponseDTO;

import java.util.List;

public interface AttendanceService {
    
    List<AttendanceResponseDTO> getAllAttendances();
    
    AttendanceResponseDTO createAttendance(AttendanceCreateDTO dto);
}
