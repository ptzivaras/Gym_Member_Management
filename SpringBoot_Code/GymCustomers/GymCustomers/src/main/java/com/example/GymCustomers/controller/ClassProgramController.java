package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.ClassProgram;
import com.example.GymCustomers.repository.ClassProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClassProgramController {

    @Autowired
    private ClassProgramRepository classProgramRepository;

    @GetMapping("/classprograms")
    public List<ClassProgram> getAllClassPrograms() {
        return classProgramRepository.findAll();
    }

    @PutMapping("/classprograms/{id}")
    public ResponseEntity<ClassProgram> updateClassProgram(
            @PathVariable Long id,
            @RequestBody ClassProgram updatedProgram,
            @RequestHeader HttpHeaders headers) {

        // Ensure the content type is correct
        if (!headers.getContentType().equals(org.springframework.http.MediaType.APPLICATION_JSON)) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Content-Type must be application/json");
        }

        Optional<ClassProgram> existingProgramOptional = classProgramRepository.findById(id);

        if (!existingProgramOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if not found
        }

        ClassProgram existingProgram = existingProgramOptional.get();

        // Update the fields as needed
        if (updatedProgram.getClassName() != null) {
            existingProgram.setClassName(updatedProgram.getClassName());
        }

        if (updatedProgram.getDayOfWeek() != null) {
            existingProgram.setDayOfWeek(updatedProgram.getDayOfWeek());
        }

        if (updatedProgram.getStartTime() != null) {
            existingProgram.setStartTime(updatedProgram.getStartTime());
        }

        if (updatedProgram.getEndTime() != null) {
            existingProgram.setEndTime(updatedProgram.getEndTime());
        }

        if (updatedProgram.getTrainerName() != null) {
            existingProgram.setTrainerName(updatedProgram.getTrainerName());
        }



        ClassProgram savedProgram = classProgramRepository.save(existingProgram);
        return ResponseEntity.ok(savedProgram);
    }

}