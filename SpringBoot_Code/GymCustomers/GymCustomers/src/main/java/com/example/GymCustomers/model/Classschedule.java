package com.example.GymCustomers.model;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "classschedule")
public class Classschedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    private String className;



    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }





    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
