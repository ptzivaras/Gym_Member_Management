import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerService from '../../Services/TrainerService';

import './TrainerCreate.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';


const TrainerCreate = () => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
   
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = e => {
    const { name, value } = e.target;
    setTrainer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to create this trainer with the provided data?');
    if (isConfirmed) {
      TrainerService.createTrainer(trainer)
        .then(response => {
          console.log('Trainer created successfully:', response.data);
          navigate(-1); // Navigate back to the previous page
        })
        .catch(error => {
          console.error('Error creating trainer:', error);
        });
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel the creation of this trainer? All data will be lost.');
    if (isConfirmed) {
      navigate(-1); // Go back to the previous page
    }
  };

  return (
    <div className='customer-create-container'>
      <div className='header'>
        {/* <BackButton /> */}
        <h2>Create Trainer</h2>
      </div>
      <form className='customer-create-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={trainer.firstName}
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
            value={trainer.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='specialty'>Specialty:</label>
          <input
            type='specialty'
            id='specialty'
            name='specialty'
            value={trainer.specialty}
            onChange={handleChange}
            required
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

export default TrainerCreate;
