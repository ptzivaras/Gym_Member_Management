import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './ViewCustomers2.css'; // Import CSS file
import BackButton from '../BackButton/BackButton';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [currentMembership, setCurrentMembership] = useState(null);

  useEffect(() => {
    // Fetch customer details
    CustomerService.getCustomerById(customerId)
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer details:', error);
      });

    // Fetch all payments and find this customer's latest active membership
    CustomerService.getPayments()
      .then(response => {
        const customerPayments = response.data.filter(
          payment => payment.customerId === parseInt(customerId)
        );
        
        if (customerPayments.length > 0) {
          // Sort by payment date descending and get the most recent
          const latestPayment = customerPayments.sort((a, b) => 
            new Date(b.paymentDate) - new Date(a.paymentDate)
          )[0];
          
          setCurrentMembership({
            hasMembership: true,
            details: {
              amount: latestPayment.amount,
              duration: latestPayment.membershipPlanType,
              endDate: latestPayment.expirationDate,
              planType: latestPayment.membershipPlanType,
              paymentDate: latestPayment.paymentDate
            }
          });
        } else {
          setCurrentMembership({ hasMembership: false });
        }
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
        setCurrentMembership({ hasMembership: false });
      });
  }, [customerId]);

  const renderMembershipInfo = () => {
    if (!currentMembership || !currentMembership.hasMembership) {
      return <span className='no-membership'>No Membership</span>;
    }
    const { amount, duration, endDate, planType } = currentMembership.details;
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    return `€${amount} - ${duration} - ${formattedEndDate} - ${planType}`;
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
