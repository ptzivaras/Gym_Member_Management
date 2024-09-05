import axios from 'axios';

const TRAINER_API_BASE_URL = "http://localhost:8080/api/v1/trainers";

class TrainerService {

    getTrainers(){
        return axios.get(TRAINER_API_BASE_URL);
    }

    createTrainer(trainerData) {
        return axios.post(TRAINER_API_BASE_URL, trainerData);
      }

    deleteTrainer(trainerId) {
        return axios.delete(`${TRAINER_API_BASE_URL}/${trainerId}`);
    }
    
}

export default new TrainerService()