import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassService from '../../Services/ClassService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ClassList.css';

const ClassList = () => {
  const [schedule, setSchedule] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState([]);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedCell, setSelectedCell] = useState(null); // State for the selected cell
  const [selectedTrainer, setSelectedTrainer] = useState(''); // State for the selected trainer
  const [selectedClassType, setSelectedClassType] = useState(''); // State for the selected class type

  const navigate = useNavigate();

  useEffect(() => {
    ClassService.getClasses()
      .then(response => {
        const sortedSchedule = response.data.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime);
        });
        setSchedule(sortedSchedule);
        setEditedSchedule(sortedSchedule);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const formatTime = timeStr => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const renderTableRows = () => {
    const classesByTime = {};
    (editMode ? editedSchedule : schedule).forEach(classItem => {
      const key = `${classItem.startTime}-${classItem.endTime}`;
      if (!classesByTime[key]) {
        classesByTime[key] = {};
      }
      classesByTime[key][classItem.dayOfWeek] = classItem.className;
    });

    return Object.keys(classesByTime).map(timeSlot => (
      <tr key={timeSlot}>
        <td>{formatTime(timeSlot.split('-')[0])} - {formatTime(timeSlot.split('-')[1])}</td>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <td
            key={day}
            className={editMode ? 'clickable-cell' : ''}
            onClick={editMode ? () => handleCellClick(timeSlot, day) : null}
          >
            {classesByTime[timeSlot][day] || '-'}
          </td>
        ))}
      </tr>
    ));
  };

  const handleCellClick = (timeSlot, day) => {
    setSelectedCell({ timeSlot, day });
    setShowEditModal(true);
  };

  const handleSaveSelection = () => {
    const newSchedule = editedSchedule.map(classItem => {
      const key = `${classItem.startTime}-${classItem.endTime}`;
      if (key === selectedCell.timeSlot && classItem.dayOfWeek === selectedCell.day) {
        return { ...classItem, className: `${selectedClassType} (${selectedTrainer})` };
      }
      return classItem;
    });
    setEditedSchedule(newSchedule);
    setShowEditModal(false);
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmSave = () => {
    setSchedule(editedSchedule);
    setEditMode(false);
    setShowSaveConfirm(false);
    // Here you would typically call a service to save the data to the backend
  };

  const confirmCancel = () => {
    setEditedSchedule(schedule);
    setEditMode(false);
    setShowCancelConfirm(false);
  };

  return (
    <div className="class-list-container">
      <div className="button-container">
        {editMode ? (
          <>
            <button className='confirm-button' type="button" onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} className='icon' /> Save
            </button>
            <button className='cancel-button' type="button" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} className='icon' /> Cancel
            </button>
          </>
        ) : (
          <>
            <button className='create-class-button' type="button" onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faEdit} className='icon' /> Schedule
            </button>
            <button className='create-class-button' type="button" onClick={() => navigate('/classtype')}>
              <FontAwesomeIcon icon={faPlus} className='icon' /> Class
            </button>
          </>
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

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Class Type and Trainer</h3>
            <div className="modal-actions">
              <label>
                Class Type:
                <select value={selectedClassType} onChange={(e) => setSelectedClassType(e.target.value)}>
                  <option value="">Select a class type</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Zumba">Zumba</option>
                </select>
              </label>
              <label>
                Trainer:
                <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                  <option value="">Select a trainer</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                </select>
              </label>
              <button onClick={handleSaveSelection} className="modal-button confirm-button">Save</button>
              <button onClick={() => setShowEditModal(false)} className="modal-button cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
