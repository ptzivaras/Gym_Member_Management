import React, { useState, useEffect } from 'react';
import ClassService from '../../Services/ClassService';
import './ClassList.css'; // Import CSS file

const ClassList = () => {
  const [schedule, setSchedule] = useState([]);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [editedSchedule, setEditedSchedule] = useState([]); // State for edited schedule
  const [showSaveConfirm, setShowSaveConfirm] = useState(false); // State for save confirmation
  const [showCancelConfirm, setShowCancelConfirm] = useState(false); // State for cancel confirmation

  useEffect(() => {
    // Fetch class data from the server
    ClassService.getClasses()
      .then(response => {
        // Sort the schedule by start time
        const sortedSchedule = response.data.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime);
        });
        setSchedule(sortedSchedule); // Changed state variable name to 'schedule'
        setEditedSchedule(sortedSchedule); // Initialize edited schedule with fetched data
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Function to format time to display in HH:MM format
  const formatTime = timeStr => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  // Function to render table rows
  const renderTableRows = () => {
    // Create an object to store class names for each time slot and day of the week
    const classesByTime = {};
    (editMode ? editedSchedule : schedule).forEach(classItem => {
      const key = `${classItem.startTime}-${classItem.endTime}`;
      if (!classesByTime[key]) {
        classesByTime[key] = {};
      }
      classesByTime[key][classItem.dayOfWeek] = classItem.className;
    });

    // Render table rows
    return Object.keys(classesByTime).map(timeSlot => (
      <tr key={timeSlot}>
        <td>{formatTime(timeSlot.split('-')[0])} - {formatTime(timeSlot.split('-')[1])}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Monday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Monday')} /> : (classesByTime[timeSlot]['Monday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Tuesday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Tuesday')} /> : (classesByTime[timeSlot]['Tuesday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Wednesday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Wednesday')} /> : (classesByTime[timeSlot]['Wednesday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Thursday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Thursday')} /> : (classesByTime[timeSlot]['Thursday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Friday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Friday')} /> : (classesByTime[timeSlot]['Friday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Saturday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Saturday')} /> : (classesByTime[timeSlot]['Saturday'] || '-')}</td>
        <td>{editMode ? <input type="text" value={classesByTime[timeSlot]['Sunday'] || ''} onChange={(e) => handleInputChange(e, timeSlot, 'Sunday')} /> : (classesByTime[timeSlot]['Sunday'] || '-')}</td>
      </tr>
    ));
  };

  // Function to handle input changes
  const handleInputChange = (e, timeSlot, dayOfWeek) => {
    const newSchedule = editedSchedule.map(classItem => {
      const key = `${classItem.startTime}-${classItem.endTime}`;
      if (key === timeSlot && classItem.dayOfWeek === dayOfWeek) {
        return { ...classItem, className: e.target.value };
      }
      return classItem;
    });
    setEditedSchedule(newSchedule);
  };

  // Function to handle save button click
  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  // Function to confirm save
  const confirmSave = () => {
    setSchedule(editedSchedule);
    setEditMode(false);
    setShowSaveConfirm(false);
    // Here you would typically call a service to save the data to the backend
  };

  // Function to confirm cancel
  const confirmCancel = () => {
    setEditedSchedule(schedule);
    setEditMode(false);
    setShowCancelConfirm(false);
  };

  return (
    <div className="class-list-container"> 
      {editMode ? (
        <>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button type="button" onClick={() => setEditMode(true)}>Update</button>
      )}
      
      <table className="class-table">
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

      {showSaveConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to save the changes?</h3>
            <div className="modal-actions">
              <button onClick={confirmSave} className="modal-button confirm-button">Yes</button>
              <button onClick={() => setShowSaveConfirm(false)} className="modal-button cancel-button">No</button>
            </div>
          </div>
        </div>
      )}

      {showCancelConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to cancel the changes?</h3>
            <div className="modal-actions">
              <button onClick={confirmCancel} className="modal-button confirm-button">Yes</button>
              <button onClick={() => setShowCancelConfirm(false)} className="modal-button cancel-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
