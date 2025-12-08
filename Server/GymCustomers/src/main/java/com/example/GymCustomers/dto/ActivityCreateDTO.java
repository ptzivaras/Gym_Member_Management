package com.example.GymCustomers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ActivityCreateDTO {
    
    @NotBlank(message = "Activity name is required")
    @Size(min = 2, max = 100, message = "Activity name must be between 2 and 100 characters")
    private String activityName;

    // Getters and Setters
    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }
}
