import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import CustomerService from '../Services/CustomerService';
import './PricePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function PricePage() {
  const [data, setData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);

  useEffect(() => {
    CustomerService.getMemberships()
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Plan Type',
        accessor: 'planType',
      },
      {
        Header: 'Price (euro)',
        accessor: 'price',
        Cell: ({ value, row }) => {
          if (editRowIndex === row.index) {
            return (
              <input
                type="number"
                defaultValue={value}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
            );
          }
          return value;
        }
      },
      {
        Header: 'Duration (months)',
        accessor: 'duration',
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
  } = useTable({ columns, data });

  const handleEdit = (row) => {
    setEditRowIndex(row.index);
    setUpdatedPrice(row.values.price);
  };

  const handleSave = (row) => {
    const updatedRow = { ...row.original, price: updatedPrice };
    CustomerService.updateMembership(updatedRow.membershipId, updatedRow)
      .then(response => {
        const newData = [...data];
        newData[row.index] = response.data;
        setData(newData);
        setEditRowIndex(null);
        alert('Data saved successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  const handleCancel = () => {
    setEditRowIndex(null);
    setUpdatedPrice(null);
  };

  return (
    <div className="container">
      <table {...getTableProps()} className="price-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PricePage;
