import axios from 'axios';

const TRAINER_API_BASE_URL = "http://localhost:8080/api/v1/trainers";

class TrainerService {

    getTrainers(){
        return axios.get(TRAINER_API_BASE_URL);
    }

    
}

export default new TrainerService()