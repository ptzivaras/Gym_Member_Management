import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import Modal from '../ModalPopUp/Modal'; // Import the Modal component
import './CustomerCreate.css'; // Import CSS file

const CustomerCreate = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = e => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customer.firstName) newErrors.firstName = 'First Name is required';
    if (!customer.lastName) newErrors.lastName = 'Last Name is required';
    if (!customer.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) newErrors.email = 'Email is invalid';
    if (!customer.phone) newErrors.phone = 'Phone is required';
    else if (!/^[+]?[0-9]{10,15}$/.test(customer.phone)) newErrors.phone = 'Phone must be 10-15 digits (optional + prefix)';
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setModalMessage('Are you sure you want to create this customer with the provided data?');
    setModalAction(() => () => {
      CustomerService.createCustomer(customer)
        .then(response => {
          console.log('Customer created successfully:', response.data);
          navigate(-1); // Navigate back to the previous page
        })
        .catch(error => {
          console.error('Error creating customer:', error);
        });
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setModalMessage('Are you sure you want to cancel the creation of this customer? All data will be lost.');
    setModalAction(() => () => navigate(-1));
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
      <form className='customer-create-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={customer.firstName}
            onChange={handleChange}
            placeholder='* First Name'
            required
            className={errors.firstName ? 'error required' : 'required'}
          />
          {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={customer.lastName}
            onChange={handleChange}
            placeholder='* Last Name'
            required
            className={errors.lastName ? 'error required' : 'required'}
          />
          {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
        </div>
        <div className='form-group'>
          <input
            type='email'
            id='email'
            name='email'
            value={customer.email}
            onChange={handleChange}
            placeholder='* Email'
            required
            className={errors.email ? 'error required' : 'required'}
          />
          {errors.email && <div className='error-message'>{errors.email}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='phone'
            name='phone'
            value={customer.phone}
            onChange={handleChange}
            placeholder='* Phone'
            required
            className={errors.phone ? 'error required' : 'required'}
          />
          {errors.phone && <div className='error-message'>{errors.phone}</div>}
        </div>
        <div className='form-group'>
          <input
            type='text'
            id='address'
            name='address'
            value={customer.address}
            onChange={handleChange}
            placeholder='Address'
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='create-submit-button'>Create</button>
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
