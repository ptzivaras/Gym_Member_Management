import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/customers";
const MEMBERSHIP_API_BASE_URL="http://localhost:8080/api/v1/memberships";
const PAYMENT_API_BASE_URL="http://localhost:8080/api/v1/payments";


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

    getMemberships(){
        return axios.get(MEMBERSHIP_API_BASE_URL);
    }

    updateMembership(membershipId, updatedMembershipData) {
        const url = `${MEMBERSHIP_API_BASE_URL}/${membershipId}`;
        return axios.put(url, updatedMembershipData);
    }

    getPayments(){
        return axios.get(PAYMENT_API_BASE_URL);
    }
}

export default new CustomerService()