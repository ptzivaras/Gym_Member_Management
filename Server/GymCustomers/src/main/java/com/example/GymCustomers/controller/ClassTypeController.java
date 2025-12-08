package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.service.ClassTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1")
public class ClassTypeController {

    private final ClassTypeService classTypeService;

    @Autowired
    public ClassTypeController(ClassTypeService classTypeService) {
        this.classTypeService = classTypeService;
    }

    @GetMapping("/classtype")
    public List<ClassType> getAllClassType() {
        return classTypeService.getAllClassTypes();
    }

    @PostMapping("/classtype")
    public ClassType createClassType(@RequestBody ClassType classType) {
        return classTypeService.createClassType(classType);
    }

    @PutMapping("/classtype/{id}")
    public ResponseEntity<ClassType> updateClassType(@PathVariable Long id, @RequestBody ClassType classTypeDetails) {
        Optional<ClassType> updatedClassType = classTypeService.updateClassType(id, classTypeDetails);
        return updatedClassType.map(ResponseEntity::ok)
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
