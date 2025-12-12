import axiosInstance from '../api/axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const CLASSTYPE_API_BASE_URL = `${API_BASE_URL}/classtype`;

class ClassTypeService {
    // Get all ClassTypes
    getClassTypes(signal) {
        return axiosInstance.get(CLASSTYPE_API_BASE_URL, { signal });
    }
    
    // Create a new ClassType
    createClassType(classType) {
        return axiosInstance.post(CLASSTYPE_API_BASE_URL, classType);
    }

    // Update an existing ClassType
    updateClassType(id, classTypeDetails) {
        return axiosInstance.put(`${CLASSTYPE_API_BASE_URL}/${id}`, classTypeDetails);
    }

    // Delete a ClassType
    deleteClassType(id) {
        return axiosInstance.delete(`${CLASSTYPE_API_BASE_URL}/${id}`);
    }
}

export default new ClassTypeService();
