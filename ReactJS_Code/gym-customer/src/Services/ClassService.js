// import axios from 'axios';

// const CLASS_API_BASE_URL = "http://localhost:8080/api/v1/classschedules";
// const CLASSTYPE_API_BASE_URL = "http://localhost:8080/api/v1/classtype";

// class ClassService {

//     getClasses(){
//         return axios.get(CLASS_API_BASE_URL);
//     }

//     getClassType(){
//         return axios.get(CLASSTYPE_API_BASE_URL);
//     }

//     // saveSchedule(scheduleData) {
//     //     return axios.post(`${CLASS_API_BASE_URL}/save`, scheduleData);
//     // }
    
//     updateSchedule(id, scheduleData) {
//         return axios.put(`${CLASS_API_BASE_URL}/${id}`, scheduleData);
//       }
      
// }



// export default new ClassService()

import axios from 'axios';

const CLASS_API_BASE_URL = "http://localhost:8080/api/v1/classprograms"; // to new oxi to allo me to normalization

class ClassService {
    // Fetch all class programs
    getClasses() {
        return axios.get(CLASS_API_BASE_URL);
    }

    // Update a class program by ID
    updateSchedule(id, scheduleData) {
        return axios.put(`${CLASS_API_BASE_URL}/${id}`, scheduleData, {
            headers: {
                'Content-Type': 'application/json' 
            }
        });
    }
}

export default new ClassService();
