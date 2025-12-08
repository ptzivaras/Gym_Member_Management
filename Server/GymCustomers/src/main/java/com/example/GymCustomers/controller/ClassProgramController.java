package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.ClassProgram;
import com.example.GymCustomers.service.ClassProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClassProgramController {

    private final ClassProgramService classProgramService;

    @Autowired
    public ClassProgramController(ClassProgramService classProgramService) {
        this.classProgramService = classProgramService;
    }

    @GetMapping("/classprograms")
    public List<ClassProgram> getAllClassPrograms() {
        return classProgramService.getAllClassPrograms();
    }

    @PutMapping("/classprograms/{id}")
    public ResponseEntity<ClassProgram> updateClassProgram(
            @PathVariable Long id,
            @RequestBody ClassProgram updatedProgram) {

        Optional<ClassProgram> savedProgram = classProgramService.updateClassProgram(id, updatedProgram);
        return savedProgram.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}