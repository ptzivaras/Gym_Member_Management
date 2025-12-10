import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const TRAINER_API_BASE_URL = `${API_BASE_URL}/trainers`;

class TrainerService {

    getTrainers(){
        return axios.get(TRAINER_API_BASE_URL);
    }

    createTrainer(trainerData) {
        return axios.post(TRAINER_API_BASE_URL, trainerData);
      }

    getTrainerById(trainerId) {
        return axios.get(`${TRAINER_API_BASE_URL}/${trainerId}`);
    }

    updateTrainer(trainerId, trainerData) {
        return axios.put(`${TRAINER_API_BASE_URL}/${trainerId}`, trainerData);
    }

    deleteTrainer(trainerId) {
        return axios.delete(`${TRAINER_API_BASE_URL}/${trainerId}`);
    }
    
}

export default new TrainerService()