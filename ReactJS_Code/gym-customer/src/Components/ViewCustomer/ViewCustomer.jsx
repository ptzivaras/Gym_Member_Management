// ViewCustomer.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './ViewCustomers2.css'; // Import CSS file

const ViewCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();

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
        setEditing(false); // Turn off editing mode after successful update
      })
      .catch(error => {
        console.error('Error updating customer:', error);
      });
  };

  const handleDelete = () => {
    // Implement delete functionality here
    CustomerService.deleteCustomer(customerId)
      .then(response => {
        console.log('Customer deleted successfully:', response.data);
        // Redirect to the home page or another appropriate page after deletion
        navigate.push('/');
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
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
              {editing ? (
                <input
                  className='customer-table-input2'
                  type="text"
                  name="firstName"
                  value={editedCustomer.firstName}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.firstName
              )}
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>Last Name:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input2'
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
            <th className='customer-table-header2'>E-mail:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input2'
                  type="text"
                  name="email"
                  value={editedCustomer.email}
                  onChange={handleFieldChange}
                />
              ) : (
                customer.email
              )}
            </td>
          </tr>
          <tr>
            <th className='customer-table-header2'>Phone Number:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input2'
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
            <th className='customer-table-header2'>Address:</th>
            <td>
              {editing ? (
                <input
                  className='customer-table-input2'
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

      {editing ? (
        <div>
          <button className='customer-table-button2' onClick={handleUpdate}>Save Changes</button>
          <button className='customer-table-button2' onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button className='customer-table-button2' onClick={() => setEditing(true)}>Update Customer</button>
          <button className='customer-table-button2' onClick={handleDelete}>Delete Customer</button>
          <Link to="/" className='customer-table-link2'>Return Back</Link>
        </div>
      )}
    </div>
  );
};

export default ViewCustomer;
