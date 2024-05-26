import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CustomerService from '../../Services/CustomerService';
import './CustomerCreate.css'; // Import CSS file

const CustomerCreate = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    // Add more fields as needed
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Call the service to create a new customer
    CustomerService.createCustomer(customer)
      .then(response => {
        console.log('Customer created successfully:', response.data);
        // Optionally, redirect to another page after successful creation
        // For example, history.push('/customer-list');
      })
      .catch(error => {
        console.error('Error creating customer:', error);
      });
  };

  return (
    <div className='customer-create-container'>
      <h2>Create New Customer</h2>
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
        {/* Add more form fields as needed */}
        <button type='submit'>Create</button>
        <Link to="/" className='customer-table-link2'>Cancel</Link>

        {/* <button type=''>Cancel</button> */}

      </form>
    </div>
  );
};

export default CustomerCreate;
