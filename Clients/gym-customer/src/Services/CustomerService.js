import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const CUSTOMER_API_BASE_URL = `${API_BASE_URL}/customers`;
const MEMBERSHIP_API_BASE_URL = `${API_BASE_URL}/memberships`;
const PAYMENT_API_BASE_URL = `${API_BASE_URL}/payments`;


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
    chooseMemberships(){
        return axios.post(MEMBERSHIP_API_BASE_URL);
    }

    updateMembership(membershipId, updatedMembershipData) {
        const url = `${MEMBERSHIP_API_BASE_URL}/${membershipId}`;
        return axios.put(url, updatedMembershipData);
    }

    getPayments(){
        return axios.get(PAYMENT_API_BASE_URL);
    }

    processPayment(customerId, membershipId) {
        const paymentData = {
            customer: { customerId: customerId },
            membership: { membershipId: membershipId }
        };
        return axios.post(PAYMENT_API_BASE_URL, paymentData);
    }
}

export default new CustomerService()