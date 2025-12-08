package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.Activities;
import com.example.GymCustomers.repository.ActivitiesRepository;
import com.example.GymCustomers.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

    private final ActivitiesRepository activitiesRepository;

    @Autowired
    public ActivityServiceImpl(ActivitiesRepository activitiesRepository) {
        this.activitiesRepository = activitiesRepository;
    }

    @Override
    public List<Activities> getAllActivities() {
        return activitiesRepository.findAll();
    }
}
