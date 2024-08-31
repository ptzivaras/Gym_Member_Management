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
      // Mock data for demonstration
      const mockCustomer = {
        firstName: 'Kostas',
        lastName: 'Katsouranis',
        email: 'kostas@gmail.com',
        phone: '6969696969',
        address: 'Spain, Madrid',
        currentMembership: {
          hasMembership: true, // Set to false to display "No Membership" in red
          details: {
            amount: 300,
            duration: '3 Months',
            endDate: '30/08/24',
            planType: 'Basic Workout',
          },
        },
      };

      // Simulate fetching data
      setCustomer(mockCustomer);
      setIsInitialLoad(false);
      
      // Uncomment below to fetch data from API
      /*
      CustomerService.getCustomerById(customerId)
        .then(response => {
          setCustomer(response.data);
          setIsInitialLoad(false);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });
      */
    }
  }, [customerId, isInitialLoad]);

  const renderMembershipInfo = () => {
    if (!customer.currentMembership || !customer.currentMembership.hasMembership) {
      return <span className='no-membership'>No Membership</span>;
    }
    const { amount, duration, endDate, planType } = customer.currentMembership.details;
    return `€${amount} - ${duration} - ${endDate} - ${planType}`;
  };

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
          <tr>
            <th className='view-customer-table-header'>Current Membership:</th>
            <td className='view-customer-table-data' colSpan="3">{renderMembershipInfo()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomer;
