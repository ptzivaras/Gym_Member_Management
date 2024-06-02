import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './UpdateCustomer.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const UpdateCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [editedCustomer, setEditedCustomer] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

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

  const handleUpdate = () => {
    // Show confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to save the changes?');
    
    if (userConfirmed) {
      // If the user confirms, proceed with the update
      CustomerService.updateCustomer(customerId, editedCustomer)
        .then(response => {
          console.log('Customer updated successfully:', response.data);
          // Navigate back to the previous page after successful update
          navigate(-1);
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    }
    // If the user cancels, do nothing
  };

  const handleFieldChange = e => {
    // Update the corresponding field in the editedCustomer state
    setEditedCustomer({
      ...editedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='customer-list-container2'>
      <div className='header'>
        <BackButton />
      </div>
      <table className='customer-table2'>
        <tbody>
          <tr>
            <th className='customer-table-header2'>First Name:</th>
            <td>
              <input
                className='customer-table-input2'
                type="text"
                name="firstName"
                value={editedCustomer.firstName || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>Last Name:</th>
            <td>
              <input
                className='customer-table-input2'
                type="text"
                name="lastName"
                value={editedCustomer.lastName || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>E-Mail:</th>
            <td>
              <input
                className='customer-table-input2'
                type="text"
                name="email"
                value={editedCustomer.email || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>Phone:</th>
            <td>
              <input
                className='customer-table-input2'
                type="text"
                name="phone"
                value={editedCustomer.phone || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>Address:</th>
            <td>
              <input
                className='customer-table-input2'
                type="text"
                name="address"
                value={editedCustomer.address || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          {/* Add similar rows for other fields like Last Name, Email, etc. */}
        </tbody>
      </table>

      <div>
        <button className='customer-table-button2' onClick={handleUpdate}>Save Changes</button>
      </div>
    </div>
  );
};

export default UpdateCustomer;
