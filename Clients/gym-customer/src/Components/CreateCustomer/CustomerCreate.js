import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import CustomerService from '../../Services/CustomerService';
import Modal from '../ModalPopUp/Modal';
import './CustomerCreate.css';

// Validation schema with yup
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[+]?[0-9]{10,15}$/, 'Phone must be 10-15 digits (optional + prefix)'),
  address: yup
    .string()
    .max(200, 'Address must not exceed 200 characters'),
});

const CustomerCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await CustomerService.createCustomer(data);
      toast.success(`Customer ${response.data.firstName} ${response.data.lastName} created successfully!`);
      // Keep button disabled while navigating
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating customer:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create customer. Please try again.';
      toast.error(errorMessage);
      setIsSubmitting(false); // Only re-enable on error
    }
  };

  const handleCancel = () => {
    setModalMessage('Are you sure you want to cancel? All data will be lost.');
    setModalAction(() => () => {
      toast.info('Customer creation cancelled');
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
    <div className='customer-create-container'>
      <div className='header'>
        <h2>Create Customer</h2>
      </div>
      <form className='customer-create-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            id='firstName'
            {...register('firstName')}
            placeholder='* First Name'
            className={errors.firstName ? 'error required' : 'required'}
          />
          {errors.firstName && <div className='error-message'>{errors.firstName.message}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='lastName'
            {...register('lastName')}
            placeholder='* Last Name'
            className={errors.lastName ? 'error required' : 'required'}
          />
          {errors.lastName && <div className='error-message'>{errors.lastName.message}</div>}
        </div>
        <div className='form-group'>
          <input
            type='email'
            id='email'
            {...register('email')}
            placeholder='* Email'
            className={errors.email ? 'error required' : 'required'}
          />
          {errors.email && <div className='error-message'>{errors.email.message}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='phone'
            {...register('phone')}
            placeholder='* Phone (10-15 digits)'
            className={errors.phone ? 'error required' : 'required'}
          />
          {errors.phone && <div className='error-message'>{errors.phone.message}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='address'
            {...register('address')}
            placeholder='Address (Optional)'
          />
          {errors.address && <div className='error-message'>{errors.address.message}</div>}
        </div>
        <div className='button-container'>
          <button type='submit' className='create-submit-button' disabled={isSubmitting}>
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Oval height={20} width={20} color="#fff" strokeWidth={4} />
                Creating...
              </span>
            ) : 'Create'}
          </button>
          <button type='button' className='create-cancel-button' onClick={handleCancel}>
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

export default CustomerCreate;
