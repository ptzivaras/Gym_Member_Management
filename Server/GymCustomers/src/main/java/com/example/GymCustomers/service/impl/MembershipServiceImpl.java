package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.MembershipCreateDTO;
import com.example.GymCustomers.dto.MembershipResponseDTO;
import com.example.GymCustomers.mapper.MembershipMapper;
import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.repository.MembershipsRepository;
import com.example.GymCustomers.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MembershipServiceImpl implements MembershipService {

    private final MembershipsRepository membershipsRepository;
    private final MembershipMapper membershipMapper;

    @Autowired
    public MembershipServiceImpl(MembershipsRepository membershipsRepository, MembershipMapper membershipMapper) {
        this.membershipsRepository = membershipsRepository;
        this.membershipMapper = membershipMapper;
    }

    @Override
    public List<MembershipResponseDTO> getAllMemberships() {
        return membershipsRepository.findAll().stream()
                .map(membershipMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MembershipResponseDTO createMembership(MembershipCreateDTO dto) {
        Memberships membership = membershipMapper.toEntity(dto);
        Memberships savedMembership = membershipsRepository.save(membership);
        return membershipMapper.toResponseDTO(savedMembership);
    }

    @Override
    public Optional<MembershipResponseDTO> getMembershipById(Long id) {
        return membershipsRepository.findById(id)
                .map(membershipMapper::toResponseDTO);
    }

    @Override
    public Optional<MembershipResponseDTO> updateMembership(Long id, MembershipCreateDTO dto) {
        Optional<Memberships> membershipOptional = membershipsRepository.findById(id);
        
        if (membershipOptional.isPresent()) {
            Memberships membership = membershipOptional.get();
            membership.setPlanType(dto.getPlanType());
            membership.setPrice(dto.getPrice());
            membership.setDuration(dto.getDuration());
            
            Memberships savedMembership = membershipsRepository.save(membership);
            return Optional.of(membershipMapper.toResponseDTO(savedMembership));
        }
        
        return Optional.empty();
    }

    @Override
    public boolean deleteMembership(Long id) {
        if (membershipsRepository.existsById(id)) {
            membershipsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
