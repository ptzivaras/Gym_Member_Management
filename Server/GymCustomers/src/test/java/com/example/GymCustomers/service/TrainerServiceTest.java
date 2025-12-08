package com.example.GymCustomers.service;

import com.example.GymCustomers.dto.PagedResponseDTO;
import com.example.GymCustomers.dto.TrainerCreateDTO;
import com.example.GymCustomers.dto.TrainerResponseDTO;
import com.example.GymCustomers.mapper.TrainerMapper;
import com.example.GymCustomers.model.Trainers;
import com.example.GymCustomers.repository.TrainersRepository;
import com.example.GymCustomers.service.impl.TrainerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TrainerServiceTest {

    @Mock
    private TrainersRepository trainersRepository;

    @Mock
    private TrainerMapper trainerMapper;

    @InjectMocks
    private TrainerServiceImpl trainerService;

    private Trainers trainer;
    private TrainerCreateDTO createDTO;
    private TrainerResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        // Setup test data
        trainer = new Trainers();
        trainer.setTrainerId(1L);
        trainer.setFirstName("Mike");
        trainer.setLastName("Tyson");
        trainer.setSpecialty("Boxing");

        createDTO = new TrainerCreateDTO();
        createDTO.setFirstName("Mike");
        createDTO.setLastName("Tyson");
        createDTO.setSpecialty("Boxing");

        responseDTO = new TrainerResponseDTO();
        responseDTO.setTrainerId(1L);
        responseDTO.setFirstName("Mike");
        responseDTO.setLastName("Tyson");
        responseDTO.setSpecialty("Boxing");
    }

    @Test
    void shouldGetAllTrainers() {
        // Given
        List<Trainers> trainers = Arrays.asList(trainer);
        when(trainersRepository.findAll()).thenReturn(trainers);
        when(trainerMapper.toResponseDTO(trainer)).thenReturn(responseDTO);

        // When
        List<TrainerResponseDTO> result = trainerService.getAllTrainers();

        // Then
        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getSpecialty()).isEqualTo("Boxing");
        verify(trainersRepository, times(1)).findAll();
        verify(trainerMapper, times(1)).toResponseDTO(trainer);
    }

    @Test
    void shouldGetAllTrainersPaginated() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        Page<Trainers> trainerPage = new PageImpl<>(Arrays.asList(trainer), pageable, 1);
        
        when(trainersRepository.findAll(pageable)).thenReturn(trainerPage);
        when(trainerMapper.toResponseDTO(trainer)).thenReturn(responseDTO);

        // When
        PagedResponseDTO<TrainerResponseDTO> result = trainerService.getAllTrainersPaginated(pageable);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getTotalPages()).isEqualTo(1);
        assertThat(result.isFirst()).isTrue();
        assertThat(result.isLast()).isTrue();
        verify(trainersRepository, times(1)).findAll(pageable);
    }

    @Test
    void shouldCreateTrainer() {
        // Given
        when(trainerMapper.toEntity(createDTO)).thenReturn(trainer);
        when(trainersRepository.save(trainer)).thenReturn(trainer);
        when(trainerMapper.toResponseDTO(trainer)).thenReturn(responseDTO);

        // When
        TrainerResponseDTO result = trainerService.createTrainer(createDTO);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getFirstName()).isEqualTo("Mike");
        assertThat(result.getSpecialty()).isEqualTo("Boxing");
        verify(trainerMapper, times(1)).toEntity(createDTO);
        verify(trainersRepository, times(1)).save(trainer);
        verify(trainerMapper, times(1)).toResponseDTO(trainer);
    }

    @Test
    void shouldGetTrainerById() {
        // Given
        when(trainersRepository.findById(1L)).thenReturn(Optional.of(trainer));
        when(trainerMapper.toResponseDTO(trainer)).thenReturn(responseDTO);

        // When
        Optional<TrainerResponseDTO> result = trainerService.getTrainerById(1L);

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().getTrainerId()).isEqualTo(1L);
        assertThat(result.get().getSpecialty()).isEqualTo("Boxing");
        verify(trainersRepository, times(1)).findById(1L);
        verify(trainerMapper, times(1)).toResponseDTO(trainer);
    }

    @Test
    void shouldReturnEmptyWhenTrainerNotFoundById() {
        // Given
        when(trainersRepository.findById(999L)).thenReturn(Optional.empty());

        // When
        Optional<TrainerResponseDTO> result = trainerService.getTrainerById(999L);

        // Then
        assertThat(result).isEmpty();
        verify(trainersRepository, times(1)).findById(999L);
        verify(trainerMapper, never()).toResponseDTO(any());
    }

    @Test
    void shouldDeleteTrainer() {
        // Given
        when(trainersRepository.existsById(1L)).thenReturn(true);
        doNothing().when(trainersRepository).deleteById(1L);

        // When
        boolean result = trainerService.deleteTrainer(1L);

        // Then
        assertThat(result).isTrue();
        verify(trainersRepository, times(1)).existsById(1L);
        verify(trainersRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldReturnFalseWhenDeleteTrainerNotFound() {
        // Given
        when(trainersRepository.existsById(999L)).thenReturn(false);

        // When
        boolean result = trainerService.deleteTrainer(999L);

        // Then
        assertThat(result).isFalse();
        verify(trainersRepository, times(1)).existsById(999L);
        verify(trainersRepository, never()).deleteById(any());
    }
}
