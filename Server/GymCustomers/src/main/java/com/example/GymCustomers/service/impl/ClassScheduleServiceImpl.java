package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import com.example.GymCustomers.service.ClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClassScheduleServiceImpl implements ClassScheduleService {

    private final ClassscheduleRepository classscheduleRepository;

    @Autowired
    public ClassScheduleServiceImpl(ClassscheduleRepository classscheduleRepository) {
        this.classscheduleRepository = classscheduleRepository;
    }

    @Override
    public List<Classschedule> getAllClassSchedules() {
        return classscheduleRepository.findAll();
    }
}
