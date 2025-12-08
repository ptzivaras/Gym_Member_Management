package com.example.GymCustomers.service.impl;

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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentsRepository paymentsRepository;
    private final CustomerRepository customerRepository;
    private final MembershipsRepository membershipsRepository;

    @Autowired
    public PaymentServiceImpl(PaymentsRepository paymentsRepository, 
                             CustomerRepository customerRepository,
                             MembershipsRepository membershipsRepository) {
        this.paymentsRepository = paymentsRepository;
        this.customerRepository = customerRepository;
        this.membershipsRepository = membershipsRepository;
    }

    @Override
    public List<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }

    @Override
    public Payments createPayment(Payments paymentRequest) {
        // Fetch customer and membership based on the IDs
        Optional<Customer> customerOptional = customerRepository.findById(
            paymentRequest.getCustomer().getCustomerId()
        );
        Optional<Memberships> membershipOptional = membershipsRepository.findById(
            paymentRequest.getMembership().getMembershipId()
        );

        if (customerOptional.isPresent() && membershipOptional.isPresent()) {
            Customer customer = customerOptional.get();
            Memberships membership = membershipOptional.get();

            // Calculate expiration date based on the membership's duration
            LocalDate paymentDate = LocalDate.now();
            LocalDate expirationDate = paymentDate.plusMonths(membership.getDuration());

            // Set payment amount based on the membership's price
            BigDecimal paymentAmount = BigDecimal.valueOf(membership.getPrice());

            // Create and save the payment
            Payments payment = new Payments();
            payment.setCustomer(customer);
            payment.setMembership(membership);
            payment.setPaymentDate(paymentDate);
            payment.setExpirationDate(expirationDate);
            payment.setAmount(paymentAmount);

            return paymentsRepository.save(payment);
        }
        
        throw new RuntimeException("Customer or Membership not found");
    }
}
