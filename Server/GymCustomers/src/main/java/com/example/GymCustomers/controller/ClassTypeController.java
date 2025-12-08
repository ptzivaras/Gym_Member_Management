package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.repository.ClassTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1")
public class ClassTypeController {

    @Autowired
    private ClassTypeRepository classTypeRepository;

    // Get all ClassTypes
    @GetMapping("/classtype")
    public List<ClassType> getAllClassType() {
        return classTypeRepository.findAll();
    }

    // Create a new ClassType
    @PostMapping("/classtype")
    public ClassType createClassType(@RequestBody ClassType classType) {
        return classTypeRepository.save(classType);
    }



    // Update an existing ClassType
    @PutMapping("/classtype/{id}")
    public ResponseEntity<ClassType> updateClassType(@PathVariable Long id, @RequestBody ClassType classTypeDetails) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);

        if (!classTypeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ClassType classType = classTypeOptional.get();
        classType.setTypeName(classTypeDetails.getTypeName()); // Assuming the field is typeName

        ClassType updatedClassType = classTypeRepository.save(classType);
        return ResponseEntity.ok(updatedClassType);
    }

    // Delete a ClassType
    @DeleteMapping("/classtype/{id}")
    public ResponseEntity<Void> deleteClassType(@PathVariable Long id) {
        Optional<ClassType> classTypeOptional = classTypeRepository.findById(id);

        if (!classTypeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        classTypeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
