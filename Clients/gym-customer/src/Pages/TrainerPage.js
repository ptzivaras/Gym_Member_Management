import React, { useState, useEffect } from 'react';
import TrainerService from '../Services/TrainerService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Modal from '../Components/ModalPopUp/Modal';
import './TrainerPage.scss';

const TrainerPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        TrainerService.getTrainers()
          .then(response => {
            setTrainers(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching trainers:', error);
            toast.error('Failed to load trainers');
            setIsLoading(false);
          });
    }, []);

    const handleCreateTrainer = () => {
        navigate('/create-trainer');
    };

    const handleDeleteClick = (trainerId) => {
        setTrainerToDelete(trainerId);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!trainerToDelete) return;
        
        setIsDeleting(trainerToDelete);
        try {
            await TrainerService.deleteTrainer(trainerToDelete);
            setTrainers(trainers.filter(trainer => trainer.trainerId !== trainerToDelete));
            toast.success('Trainer deleted successfully!');
        } catch (error) {
            console.error('Error deleting trainer:', error);
            toast.error('Failed to delete trainer');
        } finally {
            setIsDeleting(null);
            setIsModalOpen(false);
            setTrainerToDelete(null);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTrainerToDelete(null);
    };

    const generateRandomHours = () => Math.floor(Math.random() * 40) + 1;

    return (
        <div className="trainer-container">
            <div className="trainer-header">
                <button className="create-trainer-button" onClick={handleCreateTrainer}>
                    <FontAwesomeIcon icon={faPlus} className="icon" />Trainer
                </button>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <Oval
                        height={80}
                        width={80}
                        color="#9693fb"
                        secondaryColor="#ccc"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />
                    <p>Loading trainers...</p>
                </div>
            ) : (
            <div className="trainer-table-scroll">
                <table className="trainer-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
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
                    onClick={() => handleDeleteClick(trainer.trainerId)}
                    disabled={isDeleting === trainer.trainerId}>
                    {isDeleting === trainer.trainerId ? (
                        <Oval height={16} width={16} color="#fff" strokeWidth={6} />
                    ) : (
                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                    )}
                </button>
            </td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
            )}
            
            <Modal
                isOpen={isModalOpen}
                onClose={isDeleting ? null : handleModalClose}
                onConfirm={handleDeleteConfirm}
                message={isDeleting ? 'Deleting trainer...' : 'Are you sure you want to delete this trainer?'}
                isLoading={!!isDeleting}
            />
        </div>
    );
};

export default TrainerPage;
