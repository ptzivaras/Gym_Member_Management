import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import Modal from '../ModalPopUp/Modal'; 
import './UpdateCustomer.css'; 
import BackButton from '../BackButton/BackButton';

const UpdateCustomer = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [editedCustomer, setEditedCustomer] = useState({});
  const [memberships, setMemberships] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialLoad) {
      // Fetch customer details
      CustomerService.getCustomerById(customerId)
        .then(response => {
          setCustomer(response.data);
          setEditedCustomer(response.data); // Initialize editedCustomer with current data
          setIsInitialLoad(false);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });

      // Fetch memberships for the dropdown
      CustomerService.getMemberships()
        .then(response => {
          setMemberships(response.data);
        })
        .catch(error => {
          console.error('Error fetching memberships:', error);
        });
    }
  }, [customerId, isInitialLoad]);

  const handleUpdate = () => {
    setModalMessage('Are you sure you want to save the changes?');
    setModalAction(() => () => {
      setPaymentError('');
      CustomerService.updateCustomer(customerId, editedCustomer)
        .then(response => {
          console.log('Customer updated successfully:', response.data);

          if (editedCustomer.membership) {
            CustomerService.processPayment(customerId, editedCustomer.membership)
              .then(paymentResponse => {
                console.log('Payment processed successfully:', paymentResponse.data);
                navigate(-1);
              })
              .catch(error => {
                console.error('Error processing payment:', error);
                setPaymentError('Error: Could not process payment. Please try again.');
              });
          } else {
            navigate(-1);
          }
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    });
    setIsModalOpen(true);
  };

  const handleFieldChange = e => {
    setEditedCustomer({
      ...editedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleMembershipChange = e => {
    setEditedCustomer({
      ...editedCustomer,
      membership: e.target.value,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setModalAction(null);
  };

  return (
    <div className='update-customer-container'>
      <div className='update-customer-header'>
        <BackButton />
        <div className='update-customer-vertical-line'></div>
        <h2>Update Customer</h2>
      </div>

      <div className='form-group'>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          className='form-input'
          type="text"
          name="firstName"
          value={editedCustomer.firstName || ''}
          onChange={handleFieldChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          className='form-input'
          type="text"
          name="lastName"
          value={editedCustomer.lastName || ''}
          onChange={handleFieldChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className='form-input'
          type="email"
          name="email"
          value={editedCustomer.email || ''}
          onChange={handleFieldChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          className='form-input'
          type="text"
          name="phone"
          value={editedCustomer.phone || ''}
          onChange={handleFieldChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          className='form-input'
          type="text"
          name="address"
          value={editedCustomer.address || ''}
          onChange={handleFieldChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="newMembership">New Membership</label>
        <select
          id="newMembership"
          className='form-input'
          name="membership"
          value={editedCustomer.membership || ''}
          onChange={handleMembershipChange}
        >
          <option value="">None</option>
          {memberships.length > 0 ? (
            memberships.map(membership => (
              <option key={membership.membershipId} value={membership.membershipId}>
                {membership.planType} , {membership.duration} {membership.duration > 1 ? 'months' : 'month'} , {membership.price} €
              </option>
            ))
          ) : (
            <option value="">Loading memberships...</option>
          )}
        </select>
      </div>

      <div className='update-customer-button-container'>
        {paymentError && <p className="payment-error-message">{paymentError}</p>}
        <button className='update-customer-table-button' onClick={handleUpdate}>Save Changes</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          modalAction();
          closeModal();
        }}
        message={modalMessage}
      />
    </div>
  );
};

export default UpdateCustomer;
