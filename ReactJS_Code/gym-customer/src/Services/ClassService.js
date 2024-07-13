import axios from 'axios';

const CLASS_API_BASE_URL = "http://localhost:8080/api/v1/classschedules";
const CLASSTYPE_API_BASE_URL = "http://localhost:8080/api/v1/classtype";

class ClassService {

    getClasses(){
        return axios.get(CLASS_API_BASE_URL);
    }

    getClassType(){
        return axios.get(CLASSTYPE_API_BASE_URL);
    }
}



export default new ClassService()