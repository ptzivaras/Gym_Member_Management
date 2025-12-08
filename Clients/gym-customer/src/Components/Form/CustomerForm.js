import React, { useState } from 'react';
import CustomerService from '../../Services/CustomerService';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    //console.log('Form Data:', formData);
    CustomerService.createCustomer(formData)
      .then(response => {
        // Handle the success response (if needed)
        console.log('Customer created successfully:', response.data);
      })
      .catch(error => {
        // Handle the error (if needed)
        console.error('Error creating customer:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Customer Form</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Save button within the form */}
        <button type="button" onClick={handleFormSubmit}>
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
