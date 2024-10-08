import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassTypeService from '../../Services/ClassTypeService';
import { useTable } from 'react-table';
import './CreateClassType.css'; // Import CSS file

const ClassTypeCreate = () => {
  const [classType, setClassType] = useState({ typeName: '' });
  const [classTypes, setClassTypes] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetchClassTypes();
  }, []);

  const fetchClassTypes = () => {
    ClassTypeService.getClassTypes()
      .then(response => {
        setClassTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching class types:', error);
        setError('Error fetching class types');
        setTimeout(() => setError(null), 5000);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setClassType(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to create this class type with the provided data?');
    if (isConfirmed) {
      ClassTypeService.createClassType({ typeName: classType.typeName })
        .then(response => {
          console.log('Class type created successfully:', response.data);
          fetchClassTypes(); // Refresh the list after creating a new class type
          setClassType({ typeName: '' }); // Clear the form
        })
        .catch(error => {
          console.error('Error creating class type:', error);
          setError('Error creating class type');
          setTimeout(() => setError(null), 5000);
        });
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel the creation of this class type? All data will be lost.');
    if (isConfirmed) {
      navigate(-1); // Go back to the previous page
    }
  };

  // Columns configuration for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Class Type Name',
        accessor: 'typeName', // This should match the key in your data
      },
    ],
    []
  );

  // Data transformation for react-table
  const data = React.useMemo(
    () => classTypes.map(classType => ({
      typeName: classType.typeName, // Ensure the data matches the accessor
    })),
    [classTypes]
  );

  // Initialize react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className='class-type-create-container'>
      <div className='header'>
        <h2>Create Class Type</h2>
      </div>
      {error && <div className='error-message'>{error}</div>}
      <form className='class-type-create-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='typeName'>Class Type Name:</label>
          <input
            type='text'
            id='typeName'
            name='typeName'
            value={classType.typeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='submit-button'>Create</button>
          <button type='button' className='cancel-button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <div className='table-container'>
        <h3>Existing Class Types</h3>
        <table {...getTableProps()} className='class-types-table'>
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
    </div>
  );
};

export default ClassTypeCreate;
