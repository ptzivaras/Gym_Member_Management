package com.example.GymCustomers.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Trainers")
public class Trainers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerId;

    private String firstName;
    private String lastName;
    private String specialty;

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }
}
