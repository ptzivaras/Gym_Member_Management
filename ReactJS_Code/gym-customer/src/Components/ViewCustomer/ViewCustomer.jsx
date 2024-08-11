import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './ViewCustomers2.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      CustomerService.getCustomerById(customerId)
        .then(response => {
          setCustomer(response.data);
          setIsInitialLoad(false);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });
    }
  }, [customerId, isInitialLoad]);

  return (
    <div className='view-customer-container'>
      <div className='view-customer-header'>
        <BackButton />
        <div className='view-customer-vertical-line'></div> {/* Vertical line to separate header and back button */}
        <h2>View Customer</h2>
      </div>

      <table className='view-customer-table'>
        <tbody>
          <tr>
            <th className='view-customer-table-header'>First Name:</th>
            <td className='view-customer-table-data'>{customer.firstName}</td>
          </tr>
          <tr>
            <th className='view-customer-table-header'>Last Name:</th>
            <td className='view-customer-table-data'>{customer.lastName}</td>
          </tr>
          <tr>
            <th className='view-customer-table-header'>E-mail:</th>
            <td className='view-customer-table-data'>{customer.email}</td>
          </tr>
          <tr>
            <th className='view-customer-table-header'>Phone Number:</th>
            <td className='view-customer-table-data'>{customer.phone}</td>
          </tr>
          <tr>
            <th className='view-customer-table-header'>Address:</th>
            <td className='view-customer-table-data' colSpan="3">{customer.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomer;
