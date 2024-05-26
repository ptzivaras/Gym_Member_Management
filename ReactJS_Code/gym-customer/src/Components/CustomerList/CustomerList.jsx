import React, { useState, useEffect } from 'react';
import CustomerService from '../../Services/CustomerService';
import { Link } from 'react-router-dom'; // Use Link for navigation
import './CustomerList.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

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

  return (
    <div className='customer-list-container'>

      <h2 className='customer-list-header'>Customers List</h2>

      <button className='create-customer-button'>
      <Link to="/create-customer" className='create-customer-link'>
        <span className='icon'>+</span> {/* Add the icon */}
        Create
      </Link>
    </button>

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
                <Link to={`/view-customer/${customer.customerId}`} className="customer-item-button view-button">
                  <FontAwesomeIcon icon={faEye} className="icon"/> View
                </Link>
                <Link to={`/edit-customer/${customer.customerId}`} className="customer-item-button edit-button">
                  <FontAwesomeIcon icon={faEdit} className="icon"/> Edit
                </Link>
                <Link to={`/delete-customer/${customer.customerId}`} className="customer-item-button delete-button">
                  <FontAwesomeIcon icon={faTrashAlt} className="icon"/> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
