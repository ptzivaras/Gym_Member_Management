import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './UpdateCustomer.css'; // Import CSS file

const UpdateCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
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

  const handleUpdate = () => {
    // Implement update functionality here
    CustomerService.updateCustomer(customerId, editedCustomer)
      .then(response => {
        console.log('Customer updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating customer:', error);
      });
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
      <h2>Customer Details</h2>
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
        {/* Buttons for editing mode */}
        <button className='customer-table-button2' onClick={handleUpdate}>Save Changes</button>
        <Link to="/" className='customer-table-link2'>Return Back</Link>
      </div>
    </div>
  );
};

export default UpdateCustomer;
