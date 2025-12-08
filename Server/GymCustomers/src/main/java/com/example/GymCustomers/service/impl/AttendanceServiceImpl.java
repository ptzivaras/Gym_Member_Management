package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.AttendanceCreateDTO;
import com.example.GymCustomers.dto.AttendanceResponseDTO;
import com.example.GymCustomers.exception.ResourceNotFoundException;
import com.example.GymCustomers.mapper.AttendanceMapper;
import com.example.GymCustomers.model.Attendance;
import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.repository.AttendanceRepository;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final CustomerRepository customerRepository;
    private final ClassscheduleRepository classscheduleRepository;
    private final AttendanceMapper attendanceMapper;

    @Autowired
    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
                                CustomerRepository customerRepository,
                                ClassscheduleRepository classscheduleRepository,
                                AttendanceMapper attendanceMapper) {
        this.attendanceRepository = attendanceRepository;
        this.customerRepository = customerRepository;
        this.classscheduleRepository = classscheduleRepository;
        this.attendanceMapper = attendanceMapper;
    }

    @Override
    public List<AttendanceResponseDTO> getAllAttendances() {
        return attendanceRepository.findAll().stream()
                .map(attendanceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceResponseDTO createAttendance(AttendanceCreateDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + dto.getCustomerId()));
        
        Classschedule classSchedule = classscheduleRepository.findById(dto.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + dto.getClassId()));

        Attendance attendance = attendanceMapper.toEntity(dto, customer, classSchedule);
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return attendanceMapper.toResponseDTO(savedAttendance);
    }
}
