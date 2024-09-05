package com.example.GymCustomers.controller;

import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.repository.MembershipsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class MembershipsController {
    @Autowired
    private MembershipsRepository membershipRepository;

    @GetMapping("/memberships")
    public List<Memberships> getAllMemberships() {
        return membershipRepository.findAll();
    }

    @PutMapping("/memberships/{id}")
    public Memberships updateMembership(@PathVariable Long id, @RequestBody Memberships updatedMembership) {
        return membershipRepository.findById(id)
                .map(membership -> {
                    // Update the fields of the membership
                    membership.setPrice(updatedMembership.getPrice());
                    membership.setPlanType(updatedMembership.getPlanType());
                    membership.setDuration(updatedMembership.getDuration());
                    // Add other fields to update as needed

                    // Save the updated membership
                    return membershipRepository.save(membership);
                })
                .orElseThrow(() -> new RuntimeException("Membership not found with id " + id));
    }
}
