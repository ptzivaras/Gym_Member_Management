package com.example.GymCustomers.controller;

import com.example.GymCustomers.dto.MembershipCreateDTO;
import com.example.GymCustomers.dto.MembershipResponseDTO;
import com.example.GymCustomers.service.MembershipService;
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
public class MembershipsController {
    
    private final MembershipService membershipService;

    @Autowired
    public MembershipsController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping("/memberships")
    public ResponseEntity<List<MembershipResponseDTO>> getAllMemberships() {
        List<MembershipResponseDTO> memberships = membershipService.getAllMemberships();
        return ResponseEntity.ok(memberships);
    }

    @PostMapping("/memberships")
    public ResponseEntity<MembershipResponseDTO> createMembership(@Valid @RequestBody MembershipCreateDTO dto) {
        MembershipResponseDTO created = membershipService.createMembership(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/memberships/{id}")
    public ResponseEntity<MembershipResponseDTO> getMembershipById(@PathVariable Long id) {
        Optional<MembershipResponseDTO> membership = membershipService.getMembershipById(id);
        return membership.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/memberships/{id}")
    public ResponseEntity<MembershipResponseDTO> updateMembership(@PathVariable Long id, @Valid @RequestBody MembershipCreateDTO dto) {
        Optional<MembershipResponseDTO> updated = membershipService.updateMembership(id, dto);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/memberships/{id}")
    public ResponseEntity<Void> deleteMembership(@PathVariable Long id) {
        boolean deleted = membershipService.deleteMembership(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
