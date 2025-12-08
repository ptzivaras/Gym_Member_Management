package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.repository.MembershipsRepository;
import com.example.GymCustomers.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MembershipServiceImpl implements MembershipService {

    private final MembershipsRepository membershipsRepository;

    @Autowired
    public MembershipServiceImpl(MembershipsRepository membershipsRepository) {
        this.membershipsRepository = membershipsRepository;
    }

    @Override
    public List<Memberships> getAllMemberships() {
        return membershipsRepository.findAll();
    }

    @Override
    public Optional<Memberships> getMembershipById(Long id) {
        return membershipsRepository.findById(id);
    }

    @Override
    public Optional<Memberships> updateMembership(Long id, Memberships updatedMembership) {
        Optional<Memberships> membershipOptional = membershipsRepository.findById(id);
        
        if (membershipOptional.isPresent()) {
            Memberships membership = membershipOptional.get();
            membership.setPrice(updatedMembership.getPrice());
            
            Memberships savedMembership = membershipsRepository.save(membership);
            return Optional.of(savedMembership);
        }
        
        return Optional.empty();
    }
}
