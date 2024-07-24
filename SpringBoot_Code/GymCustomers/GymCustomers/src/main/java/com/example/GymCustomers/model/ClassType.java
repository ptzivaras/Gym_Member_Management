package com.example.GymCustomers.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "classtype")
public class ClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Long typeId;

    @Column(name = "type_name")
    private String typeName;

    @OneToMany(mappedBy = "viewtype", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Classschedule> classSchedules;

    // Getters and Setters
    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Set<Classschedule> getClassSchedules() {
        return classSchedules;
    }

    public void setClassSchedules(Set<Classschedule> classSchedules) {
        this.classSchedules = classSchedules;
    }
}
