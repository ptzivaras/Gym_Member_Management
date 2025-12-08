package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.ActivityCreateDTO;
import com.example.GymCustomers.dto.ActivityResponseDTO;

import java.util.List;

public interface ActivityService {
    
    List<ActivityResponseDTO> getAllActivities();
    
    ActivityResponseDTO createActivity(ActivityCreateDTO dto);
}
