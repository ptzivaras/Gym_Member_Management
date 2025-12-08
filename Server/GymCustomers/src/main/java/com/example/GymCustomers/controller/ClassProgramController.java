package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.ClassProgramCreateDTO;
import com.example.GymCustomers.dto.ClassProgramResponseDTO;
import com.example.GymCustomers.service.ClassProgramService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<ClassProgramResponseDTO>> getAllClassPrograms() {
        List<ClassProgramResponseDTO> programs = classProgramService.getAllClassPrograms();
        return ResponseEntity.ok(programs);
    }

    @PostMapping("/classprograms")
    public ResponseEntity<ClassProgramResponseDTO> createClassProgram(@Valid @RequestBody ClassProgramCreateDTO dto) {
        ClassProgramResponseDTO created = classProgramService.createClassProgram(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/classprograms/{id}")
    public ResponseEntity<ClassProgramResponseDTO> getClassProgramById(@PathVariable Long id) {
        Optional<ClassProgramResponseDTO> program = classProgramService.getClassProgramById(id);
        return program.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/classprograms/{id}")
    public ResponseEntity<ClassProgramResponseDTO> updateClassProgram(@PathVariable Long id, @Valid @RequestBody ClassProgramCreateDTO dto) {
        Optional<ClassProgramResponseDTO> updated = classProgramService.updateClassProgram(id, dto);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}