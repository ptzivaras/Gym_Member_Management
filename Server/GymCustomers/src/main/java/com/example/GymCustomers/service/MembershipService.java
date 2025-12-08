package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.MembershipCreateDTO;
import com.example.GymCustomers.dto.MembershipResponseDTO;

import java.util.List;
import java.util.Optional;

public interface MembershipService {
    
    List<MembershipResponseDTO> getAllMemberships();
    
    MembershipResponseDTO createMembership(MembershipCreateDTO dto);
    
    Optional<MembershipResponseDTO> getMembershipById(Long id);
    
    Optional<MembershipResponseDTO> updateMembership(Long id, MembershipCreateDTO dto);
    
    boolean deleteMembership(Long id);
}
