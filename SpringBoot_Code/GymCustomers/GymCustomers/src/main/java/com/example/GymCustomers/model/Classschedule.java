package com.example.GymCustomers.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "classschedule")
public class Classschedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Long classId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "viewtype", referencedColumnName = "type_id")  // Correct mapping
    private ClassType viewtype;

    @Column(name = "mtrainer_id")
    private Long mtrainerId;

    // Getters and Setters
    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
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

    public ClassType getViewtype() {
        return viewtype;
    }

    public void setViewtype(ClassType viewtype) {
        this.viewtype = viewtype;
    }

    public Long getMtrainerId() {
        return mtrainerId;
    }

    public void setMtrainerId(Long mtrainerId) {
        this.mtrainerId = mtrainerId;
    }
}
