import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import TrainerService from '../../Services/TrainerService';
import Modal from '../ModalPopUp/Modal';
import './TrainerCreate.css';
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

const TrainerCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await TrainerService.createTrainer(data);
      console.log('Trainer created successfully:', response.data);
      toast.success('Trainer created successfully!');
      // Keep button disabled while navigating
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating trainer:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create trainer.';
      toast.error(errorMessage);
      setIsSubmitting(false); // Only re-enable on error
    }
  };

  const handleCancel = () => {
    setModalMessage('Are you sure you want to cancel the creation of this trainer? All data will be lost.');
    setModalAction(() => () => {
      toast.info('Trainer creation cancelled');
      navigate(-1);
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setModalAction(null);
  };

  return (
    <div className='trainer-create-container'>
      <div className='header'>
        <BackButton />
        <div className='vertical-line'></div>
        <h2>Create Trainer</h2>
      </div>
      <form className='trainer-create-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name *</label>
          <input
            type='text'
            id='firstName'
            {...register('firstName')}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className='error-message'>{errors.firstName.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name *</label>
          <input
            type='text'
            id='lastName'
            {...register('lastName')}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='specialty'>Experienced In *</label>
          <input
            type='text'
            id='specialty'
            {...register('specialty')}
            className={errors.specialty ? 'error' : ''}
          />
          {errors.specialty && <span className='error-message'>{errors.specialty.message}</span>}
        </div>
        <div className='createtrainer-button-container'>
          <button type='submit' className='createtrainer-submit-button' disabled={isSubmitting}>
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Oval height={20} width={20} color="#fff" strokeWidth={4} />
                Creating...
              </span>
            ) : 'Create'}
          </button>
          <button type='button' className='createtrainer-cancel-button' onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          modalAction();
          closeModal();
        }}
        message={modalMessage}
      />
    </div>
  );
};

export default TrainerCreate;
