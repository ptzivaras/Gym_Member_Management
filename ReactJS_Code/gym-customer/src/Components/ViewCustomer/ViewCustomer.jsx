import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './ViewCustomers2.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      CustomerService.getCustomerById(customerId)
        .then(response => {
          setCustomer(response.data);
          setEditedCustomer(response.data); // Initialize editedCustomer with current data
          setIsInitialLoad(false);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });
    }
  }, [customerId, isInitialLoad]);

  const handleFieldChange = e => {
    // Update the corresponding field in the editedCustomer state
    setEditedCustomer({
      ...editedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='customer-container'>
      <div className='header'>
        <BackButton />
      </div>

      <table className='customer-table'>
        <tbody>
          <tr>
            <th className='customer-table-header'>First Name:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input'
                  type="text"
                  name="firstName"
                  value={editedCustomer.firstName}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.firstName
              )}
            </td>
            <th className='customer-table-header'>Last Name:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input'
                  type="text"
                  name="lastName"
                  value={editedCustomer.lastName}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.lastName
              )}
            </td>
          </tr>
          <tr>
            <th className='customer-table-header'>E-mail:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input'
                  type="text"
                  name="email"
                  value={editedCustomer.email}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.email
              )}
            </td>
            <th className='customer-table-header'>Phone Number:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input'
                  type="text"
                  name="phone"
                  value={editedCustomer.phone}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.phone
              )}
            </td>
          </tr>
          <tr>
            <th className='customer-table-header'>Address:</th>
            <td colSpan="3">
              {editing ? (
                <input
                  className='customer-table-input'
                  type="text"
                  name="address"
                  value={editedCustomer.address}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.address
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomer;
