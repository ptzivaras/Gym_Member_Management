package com.example.GymCustomers.mapper;

import com.example.GymCustomers.dto.PaymentCreateDTO;
import com.example.GymCustomers.dto.PaymentResponseDTO;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.model.Payments;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payments toEntity(PaymentCreateDTO dto, Customer customer, Memberships membership) {
        Payments payment = new Payments();
        payment.setCustomer(customer);
        payment.setMembership(membership);
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setExpirationDate(dto.getExpirationDate());
        payment.setAmount(dto.getAmount());
        return payment;
    }

    public PaymentResponseDTO toResponseDTO(Payments payment) {
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setCustomerId(payment.getCustomer().getCustomerId());
        dto.setCustomerName(payment.getCustomer().getFirstName() + " " + payment.getCustomer().getLastName());
        dto.setMembershipId(payment.getMembership().getMembershipId());
        dto.setMembershipPlanType(payment.getMembership().getPlanType());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setExpirationDate(payment.getExpirationDate());
        dto.setAmount(payment.getAmount());
        return dto;
    }
}
