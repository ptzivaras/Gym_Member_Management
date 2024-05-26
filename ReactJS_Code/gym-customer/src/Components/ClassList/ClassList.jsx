import React, { useState, useEffect } from 'react';
import ClassService from '../../Services/ClassService';
import './ClassList.css'; // Import CSS file

const ClassList = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch class data from the server
    ClassService.getClasses()
      .then(response => {
        // Sort the schedule by start time
        const sortedSchedule = response.data.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime);
        });
        setSchedule(sortedSchedule); // Changed state variable name to 'schedule'
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Function to format time to display in HH:MM format
  const formatTime = timeStr => {
    if (!timeStr) return '';
    const [hours, minutes, seconds] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  // Function to render table rows
  const renderTableRows = () => {
    // Create an object to store class names for each time slot and day of the week
    const classesByTime = {};
    schedule.forEach(classItem => {
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
        <td>{classesByTime[timeSlot]['Monday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Tuesday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Wednesday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Thursday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Friday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Saturday'] || '-'}</td>
        <td>{classesByTime[timeSlot]['Sunday'] || '-'}</td>
      </tr>
    ));
  };

  return (
    <div className="class-list-container"> 
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
