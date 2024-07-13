import axios from 'axios';

const CLASSTYPE_API_BASE_URL = "http://localhost:8080/api/v1/classtype";

class ClassTypeService {
    getClassTypes() {
        return axios.get(CLASSTYPE_API_BASE_URL);
    }
    
    createClassType(classType) {
        return axios.post(CLASSTYPE_API_BASE_URL, classType);
    }

    updateClassType(id, classTypeDetails) {
        return axios.put(`${CLASSTYPE_API_BASE_URL}/${id}`, classTypeDetails);
    }

    deleteClassType(id) {
        return axios.delete(`${CLASSTYPE_API_BASE_URL}/${id}`);
    }
}

export default new ClassTypeService();
