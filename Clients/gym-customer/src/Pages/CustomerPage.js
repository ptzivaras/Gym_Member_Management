// CustomerList.js
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../ReduxFiles/slices/CustomerSlice';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Modal from '../Components/ModalPopUp/Modal';
import './CustomerPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [pageSize, setPageSize] = useState(12);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customers.list);
  const loading = useSelector((state) => state.customers.loading);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const data = useMemo(() => customers, [customers]);

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
    },
    {
      Header: 'Full Name',
      accessor: row => `${row.firstName} ${row.lastName}`,
      id: 'fullName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: value === 'Active' ? 'green' : 'red',
              marginRight: '8px',
            }}
          ></span>
          <span>{value}</span>
        </div>
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => navigate(`/view-customer/${row.original.customerId}`)}
            className="customer-item-button view-button"
          >
            <FontAwesomeIcon icon={faEye} className="icon" /> View
          </button>
          <button
            onClick={() => navigate(`/edit-customer/${row.original.customerId}`)}
            className="customer-item-button edit-button"
          >
            <FontAwesomeIcon icon={faEdit} className="icon" /> Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row.original)}
            className="customer-item-button delete-button"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Delete
          </button>
        </div>
      ),
    },
  ], [navigate]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize: setPageSizeTable,
    state: { pageIndex, pageSize: tablePageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
    },
    usePagination,
  );

  useEffect(() => {
    setPageSizeTable(pageSize);
  }, [pageSize, setPageSizeTable]);

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteCustomer(customerToDelete.customerId)).unwrap();
      toast.success('Customer deleted successfully!');
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  if (loading) {
    return (
      <div className='loading-container-customers'>
        <Oval
          height={80}
          width={80}
          color="#9693fb"
          secondaryColor="#ccc"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='header-container'>
        <button className='create-customer-button' onClick={() => navigate('/create-customer')}>
          <FontAwesomeIcon icon={faPlus} className='icon' /> Customer
        </button>
      </div>
      <div className='table-wrapper'>
        <table {...getTableProps()} className='customer-table'>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, j) => (
                  <th {...column.getHeaderProps()} key={j}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original.id || i}>
                  {row.cells.map((cell, j) => (
                    <td {...cell.getCellProps()} key={j}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <span style={{ marginLeft: '10px' }}>Rows per page:</span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
            }}
          >
            {[12, 24, 36, 48].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span style={{ marginLeft: '10px' }}>
            {pageIndex * tablePageSize + 1}-{Math.min((pageIndex + 1) * tablePageSize, data.length)} of {data.length}
          </span>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={isDeleting ? null : closeModal}
          onConfirm={confirmDelete}
          message={isDeleting ? 'Deleting customer...' : `Are you sure you want to delete ${customerToDelete.firstName} ${customerToDelete.lastName}?`}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default CustomerList;
