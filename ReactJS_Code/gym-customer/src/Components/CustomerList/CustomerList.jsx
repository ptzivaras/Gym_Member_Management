// import React, { useEffect, useMemo, useState } from 'react';
// import { useTable, usePagination } from 'react-table';
// import { useNavigate } from 'react-router-dom';
// import CustomerService from '../../Services/CustomerService';
// import Modal from '../ModalPopUp/Modal'; // Import the Modal component
// import './CustomerList.scss'; // This is your own CSS file
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// const CustomerList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [customerToDelete, setCustomerToDelete] = useState(null);
//   const [pageSize, setPageSize] = useState(14);
//   const navigate = useNavigate();

//   useEffect(() => {
//     CustomerService.getCustomers()
//       .then(response => {
//         setCustomers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching customers:', error);
//       });
//   }, []);

//   const data = useMemo(() => customers, [customers]);

//   const columns = useMemo(() => [
//     {
//       Header: 'Full Name',
//       accessor: row => `${row.firstName} ${row.lastName}`,
//       id: 'fullName',
//     },
//     {
//       Header: 'Email',
//       accessor: 'email',
//     },
//     {
//       Header: 'Status',
//       accessor: 'status',
//     },
//     {
//       Header: 'Action',
//       Cell: ({ row }) => (
//         <div>
//           <button
//             onClick={() => navigate(`/view-customer/${row.original.customerId}`)}
//             className="customer-item-button view-button"
//           >
//             <FontAwesomeIcon icon={faEye} className="icon" /> View
//           </button>
//           <button
//             onClick={() => navigate(`/edit-customer/${row.original.customerId}`)}
//             className="customer-item-button edit-button"
//           >
//             <FontAwesomeIcon icon={faEdit} className="icon" /> Edit
//           </button>
//           <button
//             onClick={() => handleDeleteClick(row.original)}
//             className="customer-item-button delete-button"
//           >
//             <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Delete
//           </button>
//         </div>
//       ),
//     },
//   ], [navigate]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     gotoPage,
//     previousPage,
//     nextPage,
//     setPageSize: setPageSizeTable,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize },
//     },
//     usePagination,
//   );

//   useEffect(() => {
//     setPageSizeTable(pageSize);
//   }, [pageSize, setPageSizeTable]);

//   const handleDeleteClick = (customer) => {
//     setCustomerToDelete(customer);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     CustomerService.deleteCustomer(customerToDelete.customerId)
//       .then(() => {
//         setCustomers(customers.filter(customer => customer.customerId !== customerToDelete.customerId));
//         setShowDeleteModal(false);
//       })
//       .catch(error => {
//         console.error('Error deleting customer:', error);
//         setShowDeleteModal(false);
//       });
//   };

//   const closeModal = () => {
//     setShowDeleteModal(false);
//     setCustomerToDelete(null);
//   };

//   return (
//     <div className='container'>
//       <div className='table-wrapper'>
//         <div className='header-container'>
//           <button className='create-customer-button' onClick={() => navigate('/create-customer')}>
//             <FontAwesomeIcon icon={faPlus} className='icon' /> Customer
//           </button>
//         </div>
//         <table {...getTableProps()} className='price-table'>
//           <thead>
//             {headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map(row => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="pagination">
//           <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//             {'<<'}
//           </button>
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             {'<'}
//           </button>
//           <span>
//             Page:&nbsp;
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>
//           </span>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             {'>'}
//           </button>
//           <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
//             {'>>'}
//           </button>
//           <select
//             value={pageSize}
//             onChange={e => setPageSize(Number(e.target.value))}
//           >
//             {[12, 24, 36, 48].map(size => (
//               <option key={size} value={size}>
//                 Show {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {showDeleteModal && (
//         <Modal
//           isOpen={showDeleteModal}
//           onClose={closeModal}
//           onConfirm={confirmDelete}
//           message={`Are you sure you want to delete ${customerToDelete.firstName} ${customerToDelete.lastName}?`}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomerList;
