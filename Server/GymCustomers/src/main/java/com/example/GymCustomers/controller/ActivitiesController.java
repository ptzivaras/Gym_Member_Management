package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.ActivityCreateDTO;
import com.example.GymCustomers.dto.ActivityResponseDTO;
import com.example.GymCustomers.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ActivitiesController {
    
    private final ActivityService activityService;

    @Autowired
    public ActivitiesController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityResponseDTO>> getAllActivities() {
        List<ActivityResponseDTO> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    @PostMapping("/activities")
    public ResponseEntity<ActivityResponseDTO> createActivity(@Valid @RequestBody ActivityCreateDTO dto) {
        ActivityResponseDTO created = activityService.createActivity(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
