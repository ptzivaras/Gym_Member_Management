package com.example.GymCustomers.service;

import com.example.GymCustomers.model.Memberships;

import java.util.List;
import java.util.Optional;

public interface MembershipService {
    
    List<Memberships> getAllMemberships();
    
    Optional<Memberships> getMembershipById(Long id);
    
    Optional<Memberships> updateMembership(Long id, Memberships updatedMembership);
}
