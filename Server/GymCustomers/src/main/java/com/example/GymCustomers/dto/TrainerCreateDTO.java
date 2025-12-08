package com.example.GymCustomers.dto;

import jakarta.validation.constraints.*;

/**
 * DTO for creating a new trainer
 */
public class TrainerCreateDTO {
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Specialty is required")
    @Size(max = 100, message = "Specialty must not exceed 100 characters")
    private String specialty;

    // Constructors
    public TrainerCreateDTO() {}

    public TrainerCreateDTO(String firstName, String lastName, String specialty) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialty = specialty;
    }

    // Getters and Setters
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
