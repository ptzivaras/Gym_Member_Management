package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.AttendanceCreateDTO;
import com.example.GymCustomers.dto.AttendanceResponseDTO;
import com.example.GymCustomers.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class AttendanceController {
    
    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/attendances")
    public ResponseEntity<List<AttendanceResponseDTO>> getAllAttendances() {
        List<AttendanceResponseDTO> attendances = attendanceService.getAllAttendances();
        return ResponseEntity.ok(attendances);
    }

    @PostMapping("/attendances")
    public ResponseEntity<AttendanceResponseDTO> createAttendance(@Valid @RequestBody AttendanceCreateDTO dto) {
        AttendanceResponseDTO created = attendanceService.createAttendance(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
