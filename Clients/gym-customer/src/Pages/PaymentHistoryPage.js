import React, { useEffect, useState } from 'react';
import CustomerService from '../Services/CustomerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import './PaymentHistoryPage.scss';

const PaymentHistoryPage = () => {
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setIsLoading(true);
        CustomerService.getPayments()
            .then(response => {
                setPayments(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                toast.error('Failed to load payment history');
                setIsLoading(false);
            });
    }, []);

    const totalPayments = payments.length;
    const startRange = currentPage * itemsPerPage;
    const endRange = Math.min(startRange + itemsPerPage, totalPayments);
    const paginatedPayments = payments.slice(startRange, endRange);

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < totalPayments) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="payment-history-container">
            <div className="payment-history-header">
                <FontAwesomeIcon icon={faReceipt} className="header-icon" />
                <h2>Payment History</h2>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <Oval
                        height={80}
                        width={80}
                        color="#9693fb"
                        secondaryColor="#ccc"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />
                    <p>Loading payment history...</p>
                </div>
            ) : payments.length === 0 ? (
                <div className="empty-state">
                    <FontAwesomeIcon icon={faReceipt} className="empty-icon" />
                    <p>No payment records found</p>
                </div>
            ) : (
                <>
                    <div className="payment-table-scroll">
                        <table className="payment-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Customer Name</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPayments.map((payment, index) => (
                                    <tr key={payment.paymentId}>
                                        <td>{startRange + index + 1}</td>
                                        <td>
                                            {payment.customer ? 
                                                `${payment.customer.firstName} ${payment.customer.lastName}` 
                                                : 'N/A'}
                                        </td>
                                        <td className="amount-cell">€ {payment.amount}</td>
                                        <td>{formatDate(payment.paymentDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-pagination">
                        <span>
                            {startRange + 1}-{endRange} of {totalPayments}
                        </span>
                        <div className="pagination-controls">
                            <button onClick={handlePrevious} disabled={currentPage === 0}>
                                &lt;
                            </button>
                            <button 
                                onClick={handleNext} 
                                disabled={(currentPage + 1) * itemsPerPage >= totalPayments}>
                                &gt;
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentHistoryPage;
