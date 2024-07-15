import React, { useState, useEffect } from 'react';
import TrainerService from '../Services/TrainerService';
import './TrainerPage.css';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';




const TrainerPage = () => {
    const [trainers, setTrainers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the data when the component mounts
        TrainerService.getTrainers()
          .then(response => setTrainers(response.data))
          .catch(error => console.error('Error fetching trainers:', error));
      }, []);

    const handleCreateTrainer = () => {
      navigate('/create-trainer');
    };

    return (
      <div className="trainer-list-container" >
        <button className='create-trainer-button' onClick={handleCreateTrainer}>
          <FontAwesomeIcon icon={faPlus} className="icon"/> Trainer
        </button>

        

        <table className='trainer-table'> {/* Using table for grid layout */}
          <thead>
            <tr>
              <th>Name</th> {/* Table header for Name */}
              <th>Class</th> {/* Table header for Class */}
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer.trainerId}>
                <td>{trainer.firstName} {trainer.lastName}</td> {/* Table cell for Name */}
                <td>{trainer.specialty}</td> {/* Table cell for Class */}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  };
  
  export default TrainerPage;