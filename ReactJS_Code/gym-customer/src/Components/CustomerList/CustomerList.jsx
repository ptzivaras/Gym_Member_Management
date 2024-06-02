import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import CustomerService from '../../Services/CustomerService';
import './CustomerList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch customer data from the server
    CustomerService.getCustomers()
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleCreateCustomer = () => {
    navigate('/create-customer'); // Navigate to the create customer page
  };

  return (
    <div className='customer-list-container'>

      <div className='header-container'>
        <button 
          className='create-customer-button' 
          onClick={handleCreateCustomer} 
        >
          <span className='icon'>+</span> 
          Create
        </button>
        {/* <h3 className='customer-list-header'>Customers List</h3> */}

      </div>

      <table className='customer-table'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customerId}>
              <td>{customer.firstName} {customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.status}</td>
              <td>
                <button 
                  onClick={() => navigate(`/view-customer/${customer.customerId}`)} 
                  className="customer-item-button view-button"
                >
                  <FontAwesomeIcon icon={faEye} className="icon"/> View
                </button>
                <button 
                  onClick={() => navigate(`/edit-customer/${customer.customerId}`)} 
                  className="customer-item-button edit-button"
                >
                  <FontAwesomeIcon icon={faEdit} className="icon"/> Edit
                </button>
                <button 
                  onClick={() => navigate(`/delete-customer/${customer.customerId}`)} 
                  className="customer-item-button delete-button"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="icon"/> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
