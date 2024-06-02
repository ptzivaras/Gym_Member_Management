import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './CustomerCreate.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const CustomerCreate = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = e => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to create this customer with the provided data?');
    if (isConfirmed) {
      CustomerService.createCustomer(customer)
        .then(response => {
          console.log('Customer created successfully:', response.data);
          navigate(-1); // Navigate back to the previous page
        })
        .catch(error => {
          console.error('Error creating customer:', error);
        });
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel the creation of this customer? All data will be lost.');
    if (isConfirmed) {
      navigate(-1); // Go back to the previous page
    }
  };

  return (
    <div className='customer-create-container'>
      <div className='header'>
        {/* <BackButton /> */}
        <h2>Create Customer</h2>
      </div>
      <form className='customer-create-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={customer.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={customer.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={customer.phone}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            name='address'
            value={customer.address}
            onChange={handleChange}
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='submit-button'>Create</button>
          <button type='button' className='cancel-button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerCreate;
