//import ClassList from '../Components/ClassList/ClassList';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassService from '../Services/ClassService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ClassesPage.scss'; // Importing SCSS file

const ClassList = () => {
  const [schedule, setSchedule] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState([]);
  const [editedCell, setEditedCell] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    ClassService.getClasses()
      .then((response) => {
        const sortedSchedule = response.data.sort((a, b) => a.startTime.localeCompare(b.startTime));
        setSchedule(sortedSchedule);
        setEditedSchedule(sortedSchedule);
      })
      .catch((error) => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCellClick = (timeSlot, day) => {
    if (editMode) {
      setEditedCell({ timeSlot, day });
    }
  };

  const handleSave = () => {
    setSchedule(editedSchedule);
    setEditMode(false);
    setEditedCell({});
  };

  const handleCancel = () => {
    setEditedSchedule(schedule);
    setEditMode(false);
    setEditedCell({});
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
      };
    });

    return Object.keys(classesByTime).map((timeSlot) => (
      <tr key={timeSlot}>
        <td>{formatTime(timeSlot.split('-')[0])} - {formatTime(timeSlot.split('-')[1])}</td>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <td
            key={day}
            className={editMode ? 'clickable-cell' : ''}
            onClick={() => handleCellClick(timeSlot, day)}
          >
            {editMode && editedCell.timeSlot === timeSlot && editedCell.day === day ? (
              <>
                <input
                  className="small-input"
                  type="text"
                  defaultValue={classesByTime[timeSlot][day]?.className || ''}
                  onChange={(e) => setEditedCell((prev) => ({ ...prev, className: e.target.value }))}
                />
                <input
                  className="small-input"
                  type="text"
                  defaultValue={classesByTime[timeSlot][day]?.trainerName || ''}
                  onChange={(e) => setEditedCell((prev) => ({ ...prev, trainerName: e.target.value }))}
                />
              </>
            ) : (
              <>
                <div className="class-name">{classesByTime[timeSlot][day]?.className || '-'}</div>
                <div className="trainer-name">{classesByTime[timeSlot][day]?.trainerName || ''}</div>
              </>
            )}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="class-list-container">
      <div className="button-container">
        {editMode ? (
          <>
            <button className="save-button" onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
      </div>
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
    </div>
  );
};

export default ClassList;