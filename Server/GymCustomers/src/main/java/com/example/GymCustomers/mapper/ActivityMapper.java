package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.ActivityCreateDTO;
import com.example.GymCustomers.dto.ActivityResponseDTO;
import com.example.GymCustomers.model.Activities;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {

    public Activities toEntity(ActivityCreateDTO dto) {
        Activities activity = new Activities();
        activity.setActivityName(dto.getActivityName());
        return activity;
    }

    public ActivityResponseDTO toResponseDTO(Activities activity) {
        ActivityResponseDTO dto = new ActivityResponseDTO();
        dto.setActivityId(activity.getActivityId());
        dto.setActivityName(activity.getActivityName());
        return dto;
    }
}
