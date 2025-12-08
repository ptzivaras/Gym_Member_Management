package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.ActivityCreateDTO;
import com.example.GymCustomers.dto.ActivityResponseDTO;
import com.example.GymCustomers.mapper.ActivityMapper;
import com.example.GymCustomers.model.Activities;
import com.example.GymCustomers.repository.ActivitiesRepository;
import com.example.GymCustomers.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

    private final ActivitiesRepository activitiesRepository;
    private final ActivityMapper activityMapper;

    @Autowired
    public ActivityServiceImpl(ActivitiesRepository activitiesRepository, ActivityMapper activityMapper) {
        this.activitiesRepository = activitiesRepository;
        this.activityMapper = activityMapper;
    }

    @Override
    public List<ActivityResponseDTO> getAllActivities() {
        return activitiesRepository.findAll().stream()
                .map(activityMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ActivityResponseDTO createActivity(ActivityCreateDTO dto) {
        Activities activity = activityMapper.toEntity(dto);
        Activities savedActivity = activitiesRepository.save(activity);
        return activityMapper.toResponseDTO(savedActivity);
    }
}
