import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../Services/CustomerService';
import Modal from '../ModalPopUp/Modal'; // Import the Modal component
import './UpdateCustomer.css'; // Import CSS file
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
  const [isUnder18, setIsUnder18] = useState(false);
  const [hasKids, setHasKids] = useState(false);
  const [paymentError, setPaymentError] = useState(''); // New state for payment error
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
      setPaymentError(''); // Clear previous error message before starting the update process
      // First update the customer details
      CustomerService.updateCustomer(customerId, editedCustomer)
        .then(response => {
          console.log('Customer updated successfully:', response.data);

          if (editedCustomer.membership) {
            CustomerService.processPayment(customerId, editedCustomer.membership)
              .then(paymentResponse => {
                console.log('Payment processed successfully:', paymentResponse.data);
                navigate(-1); // Go back to the previous page
              })
              .catch(error => {
                console.error('Error processing payment:', error);
                setPaymentError('Error: Could not process payment. Please try again.'); // Set error message to be displayed on the screen
              });
          } else {
            navigate(-1); // Go back to the previous page if no payment is needed
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
      <table className='update-customer-table'>
        <tbody>
          <tr>
            <th className='update-customer-table-header'>First Name:</th>
            <td>
              <input
                className='update-customer-table-input'
                type="text"
                name="firstName"
                value={editedCustomer.firstName || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>Last Name:</th>
            <td>
              <input
                className='update-customer-table-input'
                type="text"
                name="lastName"
                value={editedCustomer.lastName || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>E-Mail:</th>
            <td>
              <input
                className='update-customer-table-input'
                type="text"
                name="email"
                value={editedCustomer.email || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>Phone:</th>
            <td>
              <input
                className='update-customer-table-input'
                type="text"
                name="phone"
                value={editedCustomer.phone || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>Address:</th>
            <td>
              <input
                className='update-customer-table-input'
                type="text"
                name="address"
                value={editedCustomer.address || ''}
                onChange={handleFieldChange}
              />
            </td>
          </tr>

          <tr>
            <th className='update-customer-table-header'>Current Membership:</th>
            <td>
              <div className='readonly-field'>
                WorkOutBasic - Discount Value: 20€
              </div>
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>Payment Info:</th>
            <td>
              <div className='readonly-field'>
                Payment: 300€ - Payment Date: 12/08/24 - Expiration Date: 12/11/24
              </div>
            </td>
          </tr>

          <tr>
            <th className='update-customer-table-header'>New Membership:</th>
            <td>
              <select
                className='update-customer-table-select'
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
            </td>
          </tr>

          {/* Added checkboxes for "Under 18" and "Has Kids" */}
          <tr>
            <th className='update-customer-table-header'>Under 18:</th>
            <td>
              <input
                type="checkbox"
                checked={isUnder18}
                onChange={() => setIsUnder18(!isUnder18)}
              />
            </td>
          </tr>
          <tr>
            <th className='update-customer-table-header'>Has Kids:</th>
            <td>
              <input
                type="checkbox"
                checked={hasKids}
                onChange={() => setHasKids(!hasKids)}
              />
            </td>
          </tr>

        </tbody>
      </table>

      <div className='update-customer-button-container'>
        {/* Display the payment error message in red if there is one */}
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
