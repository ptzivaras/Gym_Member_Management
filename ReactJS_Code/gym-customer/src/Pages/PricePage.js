import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTable } from 'react-table';
import CustomerService from '../Services/CustomerService';
import './PricePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faArrowUp, faArrowDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Components/ModalPopUp/Modal'; // Import your Modal component

function PricePage() {
  const [data, setData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowToSave, setRowToSave] = useState(null);
  const itemsPerPage = 10;
  const inputRefs = useRef({}); // Create a ref object to hold references to all inputs

  useEffect(() => {
    CustomerService.getMemberships()
      .then(response => {
        const dataWithPopularityAndStatus = response.data.map(item => {
          const popularityScore = Math.floor(Math.random() * 101);
          const statusOptions = ['increasing', 'same', 'decreasing'];
          const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
          return {
            ...item,
            popularityScore,
            status
          };
        });
        setData(dataWithPopularityAndStatus);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleEdit = (row) => {
    setEditRowIndex(row.index);
    setUpdatedPrice(row.values.price);
    // Ensure the input ref exists for the row being edited
    if (inputRefs.current[row.index]) {
      inputRefs.current[row.index].focus(); // Focus the input field when entering edit mode
    }
  };

  const handleSave = (row) => {
    setRowToSave(row);
    setIsModalOpen(true);
  };

  const confirmSave = () => {
    const updatedRow = { ...rowToSave.original, price: updatedPrice };
    CustomerService.updateMembership(updatedRow.membershipId, updatedRow)
      .then((response) => {
        const newData = data.map((item) =>
          item.membershipId === updatedRow.membershipId ? response.data : item
        );
        setData(newData);
        setEditRowIndex(null);
        setUpdatedPrice(null);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('There was an error updating the data!', error);
      });
  };

  const handleCancel = () => {
    setEditRowIndex(null);
    setUpdatedPrice(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredData = useMemo(() => {
    if (filter === 'all') return data;
    const months = filter === '1month' ? 1 : filter === '3months' ? 3 : filter === '6months' ? 6 : 12;
    return data.filter(item => item.duration === months);
  }, [filter, data]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => a.planType.localeCompare(b.planType));
  }, [filteredData]);

  const paginatedData = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [currentPage, sortedData]);

  const totalMemberships = filteredData.length;
  const startRange = currentPage * itemsPerPage + 1;
  const endRange = Math.min(startRange + itemsPerPage - 1, totalMemberships);

  const getPopularityLevel = (score) => {
    if (score > 66) return { level: 'High', color: 'green' };
    if (score > 33) return { level: 'Medium', color: 'yellow' };
    return { level: 'Low', color: 'red' };
  };

  const getStatusIcon = (status) => {
    if (status === 'increasing') return <FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />;
    if (status === 'decreasing') return <FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />;
    return <FontAwesomeIcon icon={faMinus} style={{ color: 'gray' }} />;
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, i) => i + 1,
        id: 'row',
      },
      {
        Header: 'Plan Type',
        accessor: 'planType',
      },
      {
        Header: 'Popularity',
        accessor: 'popularityScore',
        Cell: ({ value }) => {
          const { level, color } = getPopularityLevel(value);
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  marginRight: '5px',
                }}
              ></span>
              <span>{level}</span>
            </div>
          );
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getStatusIcon(value)}
            </div>
          );
        },
      },
      {
        Header: 'Price (€)',
        accessor: 'price',
        Cell: ({ value, row }) => {
          if (editRowIndex === row.index) {
            return (
              <input
                type="number"
                defaultValue={updatedPrice !== null ? updatedPrice : value}
                onChange={(e) => setUpdatedPrice(Number(e.target.value))}
                ref={(el) => (inputRefs.current[row.index] = el)} // Store the input ref for managing focus
                onBlur={() => {
                  // You can handle actions on blur if needed, like saving
                }}
              />
            );
          }
          return `€ ${value}`;
        },
      },
      {
        Header: 'Duration (months)',
        accessor: 'duration',
        Cell: ({ value }) => `${value} months`,
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => {
          if (editRowIndex === row.index) {
            return (
              <>
                <button onClick={() => handleSave(row)}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
                <button onClick={() => handleCancel()}>
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
              </>
            );
          }
          return (
            <button onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          );
        },
      },
    ],
    [editRowIndex, updatedPrice]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: paginatedData });

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < totalMemberships) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="price-page-container">
      <div className="price-page-tabs">
        <div className={`price-page-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</div>
        <div className={`price-page-tab ${filter === '1month' ? 'active' : ''}`} onClick={() => setFilter('1month')}>1 Month</div>
        <div className={`price-page-tab ${filter === '3months' ? 'active' : ''}`} onClick={() => setFilter('3months')}>3 Months</div>
        <div className={`price-page-tab ${filter === '6months' ? 'active' : ''}`} onClick={() => setFilter('6months')}>6 Months</div>
        <div className={`price-page-tab ${filter === '12months' ? 'active' : ''}`} onClick={() => setFilter('12months')}>12 Months</div>
      </div>
      <div className="price-page-table-wrapper">
        <table {...getTableProps()} className="price-page-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="price-page-pagination">
          <span>
            {startRange}-{endRange} of {totalMemberships}
          </span>
          <div className="pagination-controls">
            <button onClick={handlePrevious} disabled={currentPage === 0}>
              &lt;
            </button>
            <button onClick={handleNext} disabled={(currentPage + 1) * itemsPerPage >= totalMemberships}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal for confirming save */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmSave}
        message="Are you sure you want to save the changes?"
      />
    </div>
  );
}

export default PricePage;
