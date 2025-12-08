package com.example.GymCustomers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class AttendanceCreateDTO {
    
    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Class ID is required")
    private Long classId;

    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;

    @NotBlank(message = "Status is required")
    private String status;

    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
