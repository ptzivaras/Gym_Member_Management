package com.example.GymCustomers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MembershipCreateDTO {
    
    @NotBlank(message = "Plan type is required")
    private String planType;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Integer price;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer duration;

    // Getters and Setters
    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
