import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import { BsThreeDotsVertical } from 'react-icons/bs';
import '../manage.css';
import ProfileImage from '../../assets/avtar3.png';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Attendance = () => {
  const { token } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
  
        );
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAttendanceData()
  }, [token]);

  const filteredAttendance = attendanceData.filter(employee => 
    (statusFilter === '' || employee.status === statusFilter) &&
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page">
      <Header headerTitle="Attendance" />
      <div className="details">
        <div className="controls">
          <select value={statusFilter} className='control__btn' onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Status</option>
            {['Present', 'Absent', 'Pending'].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            className='control__btn'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <br />
        <p className="title"></p>
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <img src={ProfileImage} alt={employee.name} className='profile__img' />
                </td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.task || '--'}</td>
                <td>
                  <select value={employee.status} className={employee.status}>
                    {['Present', 'Absent', 'Pending'].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <BsThreeDotsVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

