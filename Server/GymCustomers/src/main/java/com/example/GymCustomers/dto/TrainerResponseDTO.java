package com.example.GymCustomers.dto;

/**
 * DTO for trainer responses
 */
public class TrainerResponseDTO {
    
    private Long trainerId;
    private String firstName;
    private String lastName;
    private String specialty;

    // Constructors
    public TrainerResponseDTO() {}

    public TrainerResponseDTO(Long trainerId, String firstName, String lastName, String specialty) {
        this.trainerId = trainerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialty = specialty;
    }

    // Getters and Setters
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
