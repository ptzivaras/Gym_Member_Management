package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.repository.ClassTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClassTypeController {

    @Autowired
    private ClassTypeRepository classTypeRepository;

    @GetMapping("/classtype")
    public List<ClassType> getAllClassType() {
        return classTypeRepository.findAll();
    }

    @PostMapping("/classtype")
    public ClassType createClassType(@RequestBody ClassType classType) {
        return classTypeRepository.save(classType);
    }
/*
    @PutMapping("/classtype/{id}")
    public ResponseEntity<ClassType> updateClassType(@PathVariable Long id, @RequestBody ClassType classTypeDetails) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);

        if (!classTypeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ClassType classType = classTypeOptional.get();
        classType.setClasstype(classTypeDetails.getClasstype());

        ClassType updatedClassType = classTypeRepository.save(classType);
        return ResponseEntity.ok(updatedClassType);
    }*/
    /*
    @DeleteMapping("/classtype/{id}")
    public ResponseEntity<Void> deleteClassType(@PathVariable Long id) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);

        if (!classTypeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        classTypeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }*/
}
