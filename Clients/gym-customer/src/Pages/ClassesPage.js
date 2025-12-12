import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassService from '../Services/ClassService'; // Import your service
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Components/ModalPopUp/Modal'; // Import your Modal component
import './ClassesPage.css'; 

const ClassList = () => {
  const [schedule, setSchedule] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState([]);
  const [editedCell, setEditedCell] = useState({});
  const [editedRowId, setEditedRowId] = useState(null); // State to track the specific row being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    
    // Fetch classes from the backend
    ClassService.getClasses(abortController.signal)
      .then((response) => {
        const sortedSchedule = response.data.sort((a, b) => a.startTime.localeCompare(b.startTime));
        setSchedule(sortedSchedule);
        setEditedSchedule(sortedSchedule);
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching classes:', error);
        }
      });
    
    // Cleanup: cancel request on component unmount
    return () => {
      abortController.abort();
    };
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCellClick = (timeSlot, day, rowId) => {
    if (editMode) {
      setEditedCell({ timeSlot, day });
      setEditedRowId(rowId); // Track the row ID being edited
    }
  };

  // Function to update the editedSchedule state
  const updateEditedSchedule = (timeSlot, day, key, value) => {
    setEditedSchedule(prev => {
      const newSchedule = [...prev];
      const index = newSchedule.findIndex(item => `${item.startTime}-${item.endTime}` === timeSlot && item.dayOfWeek === day);
      if (index !== -1) {
        newSchedule[index] = {
          ...newSchedule[index],
          [key]: value
        };
      }
      return newSchedule;
    });
  };

  // Open the confirmation modal when save is clicked
  const handleSave = () => {
    setIsModalOpen(true);
  };

  // Confirm and save changes to the backend
  const handleConfirmSave = () => {
    setIsModalOpen(false);
    setSchedule(editedSchedule);
    setEditMode(false);
    setEditedCell({});
    
    // Find the edited row by ID and update only that one
    const editedRow = editedSchedule.find(row => row.classId === editedRowId);
    
    if (editedRow) {
      ClassService.updateSchedule(editedRow.classId, editedRow) // Update only the edited row
        .then(response => {
          console.log('Class updated successfully', response);
        })
        .catch(error => {
          console.error('Error updating class:', error);
        });
    }
    
    // Reset editedRowId after saving
    setEditedRowId(null);
  };

  const handleCancel = () => {
    setEditedSchedule(schedule);
    setEditMode(false);
    setEditedCell({});
    setEditedRowId(null); // Reset the edited row ID
  };

  const renderTableRows = () => {
    const classesByTime = {};
    (editMode ? editedSchedule : schedule).forEach((classItem) => {
      const key = `${classItem.startTime}-${classItem.endTime}`;
      if (!classesByTime[key]) {
        classesByTime[key] = {};
      }
      classesByTime[key][classItem.dayOfWeek] = {
        className: classItem.className,
        trainerName: classItem.trainerName,
        rowId: classItem.classId // Pass the row ID here
      };
    });

    return Object.keys(classesByTime).map((timeSlot) => (
      <tr key={timeSlot}>
        <td>{formatTime(timeSlot.split('-')[0])} - {formatTime(timeSlot.split('-')[1])}</td>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <td
            key={day}
            className={editMode ? 'schedule-clickable-cell' : ''}
            onClick={() => handleCellClick(timeSlot, day, classesByTime[timeSlot][day]?.rowId)} // Pass rowId here
          >
            {editMode && editedCell.timeSlot === timeSlot && editedCell.day === day ? (
              <>
                <input
                  className="schedule-small-input"
                  type="text"
                  defaultValue={classesByTime[timeSlot][day]?.className || ''}
                  onChange={(e) => updateEditedSchedule(timeSlot, day, 'className', e.target.value)}
                />
                <input
                  className="schedule-small-input"
                  type="text"
                  defaultValue={classesByTime[timeSlot][day]?.trainerName || ''}
                  onChange={(e) => updateEditedSchedule(timeSlot, day, 'trainerName', e.target.value)}
                />
              </>
            ) : (
              <>
                <div className="schedule-class-name">{classesByTime[timeSlot][day]?.className || '-'}</div>
                <div className="schedule-trainer-name">{classesByTime[timeSlot][day]?.trainerName || ''}</div>
              </>
            )}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="schedule-list-container">
      <div className="schedule-button-container">
        {editMode ? (
          <>
            <button className="schedule-save-button" onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button className="schedule-cancel-button" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </>
        ) : (
          <button className="schedule-edit-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
      </div>
      <table className="schedule-class-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        message="Are you sure you want to save the changes?"
      />
    </div>
  );
};

export default ClassList;
