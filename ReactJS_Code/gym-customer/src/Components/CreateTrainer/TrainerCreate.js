import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerService from '../../Services/TrainerService';
import Modal from '../ModalPopUp/Modal'; // Import the Modal component
import './TrainerCreate.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const TrainerCreate = () => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

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
    setModalMessage('Are you sure you want to create this trainer with the provided data?');
    setModalAction(() => () => {
      TrainerService.createTrainer(trainer)
        .then(response => {
          console.log('Trainer created successfully:', response.data);
          navigate(-1); // Navigate back to the previous page
        })
        .catch(error => {
          console.error('Error creating trainer:', error);
        });
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setModalMessage('Are you sure you want to cancel the creation of this trainer? All data will be lost.');
    setModalAction(() => () => {
      navigate(-1); // Go back to the previous page
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
      <form className='trainer-create-form' onSubmit={handleSubmit}>
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
          <label htmlFor='specialty'>Experienced In:</label>
          <input
            type='text'
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
