package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.MembershipCreateDTO;
import com.example.GymCustomers.dto.MembershipResponseDTO;
import com.example.GymCustomers.model.Memberships;
import org.springframework.stereotype.Component;

@Component
public class MembershipMapper {

    public Memberships toEntity(MembershipCreateDTO dto) {
        Memberships membership = new Memberships();
        membership.setPlanType(dto.getPlanType());
        membership.setPrice(dto.getPrice());
        membership.setDuration(dto.getDuration());
        return membership;
    }

    public MembershipResponseDTO toResponseDTO(Memberships membership) {
        MembershipResponseDTO dto = new MembershipResponseDTO();
        dto.setMembershipId(membership.getMembershipId());
        dto.setPlanType(membership.getPlanType());
        dto.setPrice(membership.getPrice());
        dto.setDuration(membership.getDuration());
        return dto;
    }
}
