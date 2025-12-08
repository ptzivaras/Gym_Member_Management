package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.AttendanceCreateDTO;
import com.example.GymCustomers.dto.AttendanceResponseDTO;
import com.example.GymCustomers.model.Attendance;
import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.Customer;
import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {

    public Attendance toEntity(AttendanceCreateDTO dto, Customer customer, Classschedule classSchedule) {
        Attendance attendance = new Attendance();
        attendance.setCustomer(customer);
        attendance.setClassSchedule(classSchedule);
        attendance.setAttendanceDate(dto.getAttendanceDate());
        attendance.setStatus(dto.getStatus());
        return attendance;
    }

    public AttendanceResponseDTO toResponseDTO(Attendance attendance) {
        AttendanceResponseDTO dto = new AttendanceResponseDTO();
        dto.setAttendanceId(attendance.getAttendanceId());
        dto.setCustomerId(attendance.getCustomer().getCustomerId());
        dto.setCustomerName(attendance.getCustomer().getFirstName() + " " + attendance.getCustomer().getLastName());
        dto.setClassId(attendance.getClassSchedule().getClassId());
        dto.setClassName(attendance.getClassSchedule().getClassName());
        dto.setAttendanceDate(attendance.getAttendanceDate());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}
