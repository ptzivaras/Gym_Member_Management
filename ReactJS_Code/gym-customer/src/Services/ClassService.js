import axios from 'axios';

const CLASS_API_BASE_URL = "http://localhost:8080/api/v1/classschedules";

class ClassService {

    getClasses(){
        return axios.get(CLASS_API_BASE_URL);
    }

    
}

export default new ClassService()