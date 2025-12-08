package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class MembershipsController {
    
    private final MembershipService membershipService;

    @Autowired
    public MembershipsController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping("/memberships")
    public List<Memberships> getAllMemberships() {
        return membershipService.getAllMemberships();
    }

    @PutMapping("/memberships/{id}")
    public ResponseEntity<Memberships> updateMembership(@PathVariable Long id, @RequestBody Memberships updatedMembership) {
        Optional<Memberships> membership = membershipService.updateMembership(id, updatedMembership);
        return membership.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
