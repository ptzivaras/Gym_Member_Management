package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import com.example.GymCustomers.service.TrainerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Trainer Management", description = "APIs for managing gym trainers and their profiles")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TrainersController {
    
    private final TrainerService trainerService;

    @Autowired
    public TrainersController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @Operation(summary = "Get all trainers", description = "Retrieve a list of all gym trainers")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of trainers")
    @GetMapping("/trainers")
    public ResponseEntity<List<TrainerResponseDTO>> getAllTrainers() {
        List<TrainerResponseDTO> trainers = trainerService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    @Operation(summary = "Create new trainer", description = "Register a new trainer in the gym")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Trainer successfully created",
                    content = @Content(schema = @Schema(implementation = TrainerResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PostMapping("/trainers")
    public ResponseEntity<TrainerResponseDTO> createTrainer(@Valid @RequestBody TrainerCreateDTO trainerDTO) {
        TrainerResponseDTO createdTrainer = trainerService.createTrainer(trainerDTO);
        return new ResponseEntity<>(createdTrainer, HttpStatus.CREATED);
    }

    @Operation(summary = "Delete trainer", description = "Remove a trainer from the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Trainer successfully deleted"),
        @ApiResponse(responseCode = "404", description = "Trainer not found")
    })
    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(
            @Parameter(description = "Trainer ID", required = true) @PathVariable Long id) {
        boolean deleted = trainerService.deleteTrainer(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
