import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/customers";

class CustomerService {

    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL);
    }

    getCustomerById(customerId) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axios.get(url);
      }

    createCustomer(customerData) {
        return axios.post(CUSTOMER_API_BASE_URL, customerData);
      }
    
    updateCustomer(customerId, updatedCustomerData) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axios.put(url, updatedCustomerData);
    }
    
    deleteCustomer(customerId) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axios.delete(url);
    }
}

export default new CustomerService()