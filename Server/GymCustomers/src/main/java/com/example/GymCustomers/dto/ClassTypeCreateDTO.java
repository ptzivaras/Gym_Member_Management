package com.example.GymCustomers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClassTypeCreateDTO {
    
    @NotBlank(message = "Type name is required")
    @Size(min = 2, max = 100, message = "Type name must be between 2 and 100 characters")
    private String typeName;

    // Getters and Setters
    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
