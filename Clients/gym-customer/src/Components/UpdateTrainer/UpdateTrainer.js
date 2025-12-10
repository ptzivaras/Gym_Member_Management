import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import TrainerService from '../../Services/TrainerService';
import './UpdateTrainer.css';
import BackButton from '../BackButton/BackButton';

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  specialty: yup
    .string()
    .required('Specialty is required')
    .min(2, 'Specialty must be at least 2 characters')
    .max(100, 'Specialty must not exceed 100 characters')
});

const UpdateTrainer = () => {
  const { trainerId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    TrainerService.getTrainerById(trainerId)
      .then(response => {
        const trainer = response.data;
        setValue('firstName', trainer.firstName);
        setValue('lastName', trainer.lastName);
        setValue('specialty', trainer.specialty);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trainer:', error);
        toast.error('Failed to load trainer data');
        navigate(-1);
      });
  }, [trainerId, setValue, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await TrainerService.updateTrainer(trainerId, data);
      toast.success('Trainer updated successfully!');
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error updating trainer:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update trainer.';
      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='update-trainer-container'>
        <div className="loading-container">
          <Oval
            height={80}
            width={80}
            color="#9693fb"
            secondaryColor="#ccc"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
          <p>Loading trainer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='update-trainer-container'>
      <div className='update-trainer-header'>
        <BackButton />
        <div className='update-trainer-vertical-line'></div>
        <h2>Update Trainer</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className='form-input'
            type="text"
            {...register('firstName')}
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        <div className='form-group'>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className='form-input'
            type="text"
            {...register('lastName')}
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        <div className='form-group'>
          <label htmlFor="specialty">Specialty</label>
          <input
            id="specialty"
            className='form-input'
            type="text"
            {...register('specialty')}
          />
          {errors.specialty && <p className="error-message">{errors.specialty.message}</p>}
        </div>

        <div className='update-trainer-button-container'>
          <button 
            type="submit" 
            className='update-trainer-submit-button'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  secondaryColor="#ccc"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
                <span style={{ marginLeft: '10px' }}>Updating...</span>
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrainer;
