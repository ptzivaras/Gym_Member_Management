import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import './CustomerList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(12); // Items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.getCustomers()
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // Get current customers for the page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCreateCustomer = () => {
    navigate('/create-customer');
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    CustomerService.deleteCustomer(customerToDelete.customerId)
      .then(() => {
        setCustomers(customers.filter(customer => customer.customerId !== customerToDelete.customerId));
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
        setShowDeleteModal(false);
      });
  };

  return (
    <div className='customer-list-container'>
      <div className='header-container'>
        <button className='create-customer-button' onClick={handleCreateCustomer}>
          
        <FontAwesomeIcon icon={faPlus} className='icon' />Customer
        </button>
      </div>
      <div className='content-wrapper'>
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
            {currentCustomers.map(customer => (
              <tr key={customer.customerId}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.status}</td>
                <td>
                  <button 
                    onClick={() => navigate(`/view-customer/${customer.customerId}`)} 
                    className="customer-item-button view-button"
                  >
                    <FontAwesomeIcon icon={faEye} className="icon"/> View
                  </button>
                  <button 
                    onClick={() => navigate(`/edit-customer/${customer.customerId}`)} 
                    className="customer-item-button edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} className="icon"/> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(customer)} 
                    className="customer-item-button delete-button"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="icon"/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`pagination-button ${number === currentPage ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Are you sure you want to delete {customerToDelete.firstName} {customerToDelete.lastName}?</h3>
            <div className='modal-actions'>
              <button onClick={confirmDelete} className='modal-button confirm-button'>Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className='modal-button cancel-button'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
