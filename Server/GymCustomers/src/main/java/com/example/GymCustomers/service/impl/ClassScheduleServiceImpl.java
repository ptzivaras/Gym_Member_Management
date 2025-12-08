package com.example.GymCustomers.service.impl;

import com.example.GymCustomers.dto.ClassScheduleCreateDTO;
import com.example.GymCustomers.dto.ClassScheduleResponseDTO;
import com.example.GymCustomers.exception.ResourceNotFoundException;
import com.example.GymCustomers.mapper.ClassScheduleMapper;
import com.example.GymCustomers.model.ClassType;
import com.example.GymCustomers.model.Classschedule;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.ClassTypeRepository;
import com.example.GymCustomers.repository.ClassscheduleRepository;
import com.example.GymCustomers.repository.TrainersRepository;
import com.example.GymCustomers.service.ClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassScheduleServiceImpl implements ClassScheduleService {

    private final ClassscheduleRepository classscheduleRepository;
    private final ClassTypeRepository classTypeRepository;
    private final TrainersRepository trainersRepository;
    private final ClassScheduleMapper classScheduleMapper;

    @Autowired
    public ClassScheduleServiceImpl(ClassscheduleRepository classscheduleRepository,
                                   ClassTypeRepository classTypeRepository,
                                   TrainersRepository trainersRepository,
                                   ClassScheduleMapper classScheduleMapper) {
        this.classscheduleRepository = classscheduleRepository;
        this.classTypeRepository = classTypeRepository;
        this.trainersRepository = trainersRepository;
        this.classScheduleMapper = classScheduleMapper;
    }

    @Override
    public List<ClassScheduleResponseDTO> getAllClassSchedules() {
        return classscheduleRepository.findAll().stream()
                .map(classScheduleMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClassScheduleResponseDTO createClassSchedule(ClassScheduleCreateDTO dto) {
        ClassType classType = classTypeRepository.findById(dto.getClassTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("ClassType not found with id: " + dto.getClassTypeId()));
        
        Trainers trainer = trainersRepository.findById(dto.getTrainerId())
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + dto.getTrainerId()));

        Classschedule schedule = classScheduleMapper.toEntity(dto, classType, trainer);
        Classschedule savedSchedule = classscheduleRepository.save(schedule);
        return classScheduleMapper.toResponseDTO(savedSchedule);
    }
}
