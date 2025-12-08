package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.ClassTypeCreateDTO;
import com.example.GymCustomers.dto.ClassTypeResponseDTO;
import com.example.GymCustomers.service.ClassTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ClassTypeController {

    private final ClassTypeService classTypeService;

    @Autowired
    public ClassTypeController(ClassTypeService classTypeService) {
        this.classTypeService = classTypeService;
    }

    @GetMapping("/classtype")
    public ResponseEntity<List<ClassTypeResponseDTO>> getAllClassType() {
        List<ClassTypeResponseDTO> classTypes = classTypeService.getAllClassTypes();
        return ResponseEntity.ok(classTypes);
    }

    @PostMapping("/classtype")
    public ResponseEntity<ClassTypeResponseDTO> createClassType(@Valid @RequestBody ClassTypeCreateDTO dto) {
        ClassTypeResponseDTO created = classTypeService.createClassType(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/classtype/{id}")
    public ResponseEntity<ClassTypeResponseDTO> updateClassType(@PathVariable Long id, @Valid @RequestBody ClassTypeCreateDTO dto) {
        Optional<ClassTypeResponseDTO> updated = classTypeService.updateClassType(id, dto);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/classtype/{id}")
    public ResponseEntity<Void> deleteClassType(@PathVariable Long id) {
        boolean deleted = classTypeService.deleteClassType(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
