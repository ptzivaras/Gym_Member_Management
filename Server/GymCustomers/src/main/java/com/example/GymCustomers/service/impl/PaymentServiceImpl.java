package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.PaymentCreateDTO;
import com.example.GymCustomers.dto.PaymentResponseDTO;
import com.example.GymCustomers.exception.ResourceNotFoundException;
import com.example.GymCustomers.mapper.PaymentMapper;
import com.example.GymCustomers.model.Customer;
import com.example.GymCustomers.model.Memberships;
import com.example.GymCustomers.model.Payments;
import com.example.GymCustomers.repository.CustomerRepository;
import com.example.GymCustomers.repository.MembershipsRepository;
import com.example.GymCustomers.repository.PaymentsRepository;
import com.example.GymCustomers.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentsRepository paymentsRepository;
    private final CustomerRepository customerRepository;
    private final MembershipsRepository membershipsRepository;
    private final PaymentMapper paymentMapper;

    @Autowired
    public PaymentServiceImpl(PaymentsRepository paymentsRepository, 
                             CustomerRepository customerRepository,
                             MembershipsRepository membershipsRepository,
                             PaymentMapper paymentMapper) {
        this.paymentsRepository = paymentsRepository;
        this.customerRepository = customerRepository;
        this.membershipsRepository = membershipsRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        return paymentsRepository.findAll().stream()
                .map(paymentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponseDTO createPayment(PaymentCreateDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + dto.getCustomerId()));
        
        Memberships membership = membershipsRepository.findById(dto.getMembershipId())
                .orElseThrow(() -> new ResourceNotFoundException("Membership not found with id: " + dto.getMembershipId()));

        Payments payment = paymentMapper.toEntity(dto, customer, membership);
        Payments savedPayment = paymentsRepository.save(payment);
        return paymentMapper.toResponseDTO(savedPayment);
    }
}
