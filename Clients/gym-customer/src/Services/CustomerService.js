import axiosInstance from '../api/axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const CUSTOMER_API_BASE_URL = `${API_BASE_URL}/customers`;
const MEMBERSHIP_API_BASE_URL = `${API_BASE_URL}/memberships`;
const PAYMENT_API_BASE_URL = `${API_BASE_URL}/payments`;


class CustomerService {

    getCustomers(signal){
        return axiosInstance.get(CUSTOMER_API_BASE_URL, { signal });
    }

    getCustomerById(customerId, signal) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axiosInstance.get(url, { signal });
      }

    createCustomer(customerData) {
        return axiosInstance.post(CUSTOMER_API_BASE_URL, customerData);
      }
    
    updateCustomer(customerId, updatedCustomerData) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axiosInstance.put(url, updatedCustomerData);
    }
    
    deleteCustomer(customerId) {
        const url = `${CUSTOMER_API_BASE_URL}/${customerId}`;
        return axiosInstance.delete(url);
    }

    getMemberships(signal){
        return axiosInstance.get(MEMBERSHIP_API_BASE_URL, { signal });
    }
    chooseMemberships(){
        return axiosInstance.post(MEMBERSHIP_API_BASE_URL);
    }

    updateMembership(membershipId, updatedMembershipData) {
        const url = `${MEMBERSHIP_API_BASE_URL}/${membershipId}`;
        return axiosInstance.put(url, updatedMembershipData);
    }

    getPayments(signal){
        return axiosInstance.get(PAYMENT_API_BASE_URL, { signal });
    }

    processPayment(customerId, membershipId) {
        const paymentData = {
            customer: { customerId: customerId },
            membership: { membershipId: membershipId }
        };
        return axiosInstance.post(PAYMENT_API_BASE_URL, paymentData);
    }
}

export default new CustomerService()