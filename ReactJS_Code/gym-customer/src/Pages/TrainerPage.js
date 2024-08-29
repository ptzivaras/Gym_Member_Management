import React, { useState, useEffect } from 'react';
import TrainerService from '../Services/TrainerService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TrainerPage.scss';

const TrainerPage = () => {
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        TrainerService.getTrainers()
          .then(response => setTrainers(response.data))
          .catch(error => console.error('Error fetching trainers:', error));
    }, []);

    const handleCreateTrainer = () => {
        navigate('/create-trainer');
    };

    const handleDeleteTrainer = (trainerId) => {
        if(window.confirm("Are you sure you want to delete this trainer?")) {
            TrainerService.deleteTrainer(trainerId)
                .then(() => {
                    setTrainers(trainers.filter(trainer => trainer.trainerId !== trainerId));
                })
                .catch(error => console.error('Error deleting trainer:', error));
        }
    };

    const generateRandomHours = () => Math.floor(Math.random() * 40) + 1;

    return (
        <div className="trainer-container">
            <div className="trainer-header">
                <button className="create-trainer-button" onClick={handleCreateTrainer}>
                    <FontAwesomeIcon icon={faPlus} className="icon" />Trainer
                </button>
            </div>
            <div className="trainer-table-scroll">
                <table className="trainer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Experienced In</th>
                            <th>Weekly Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {trainers.map((trainer, index) => (
        <tr key={trainer.trainerId}>
            <td>{index + 1}</td>
            <td>{trainer.firstName} {trainer.lastName}</td>
            <td>{trainer.specialty}</td>
            <td>{generateRandomHours()}</td>
            <td>
                <button 
                    className="delete-button" 
                    onClick={() => handleDeleteTrainer(trainer.trainerId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
        </div>
    );
};

export default TrainerPage;
