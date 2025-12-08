import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
// import './ViewCustomers2.css'; // Import CSS file

const DeleteCustomer = () => {


 

  

  return (
    <div className='customer-list-container2'>
      <h2>Customer Details</h2>
      <table className='customer-table2'>
        <tbody>
          {/* Table rows for customer details */}
        </tbody>
      </table>

      <div>
        {/* Buttons for editing mode */}
        {/* <Link to="/" className='customer-table-link2'>Return Backz</Link> */}
      </div>
    </div>
  );
};

export default DeleteCustomer;
