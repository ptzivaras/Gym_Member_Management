import axiosInstance from '../api/axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const TRAINER_API_BASE_URL = `${API_BASE_URL}/trainers`;

class TrainerService {

    getTrainers(signal){
        return axiosInstance.get(TRAINER_API_BASE_URL, { signal });
    }

    createTrainer(trainerData) {
        return axiosInstance.post(TRAINER_API_BASE_URL, trainerData);
      }

    getTrainerById(trainerId, signal) {
        return axiosInstance.get(`${TRAINER_API_BASE_URL}/${trainerId}`, { signal });
    }

    updateTrainer(trainerId, trainerData) {
        return axiosInstance.put(`${TRAINER_API_BASE_URL}/${trainerId}`, trainerData);
    }

    deleteTrainer(trainerId) {
        return axiosInstance.delete(`${TRAINER_API_BASE_URL}/${trainerId}`);
    }
    
}

export default new TrainerService()