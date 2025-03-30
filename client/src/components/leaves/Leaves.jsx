// src/components/Leaves.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './leavesStyle.css';
import { AuthContext } from '../../context/authContext';
import AddLeaveModel from '../models/AddLeaveModel';
import ProfilePhoto from '../../assets/avtar3.png'

const Leaves = () => {
  const { token } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [value, onChange] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeaves = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaves',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
);
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/leaves/${id}`, { status },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
);
      fetchLeaves(token);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchLeaves(token);
  }, [token]);

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="page">
      <Header headerTitle="Leaves" />
      <div className="leaves__container">
        <div className="leaves-section">
          <div className="controls">
            <div className="left__controls">
              <select value={statusFilter} className='control__btn' onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Status</option>
                {['Approved', 'Pending', 'Rejected'].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="right__controls">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                className='control__btn'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="add__leave" onClick={openModal}>Add Leave</button>
            </div>
          </div>
          
          {isModalOpen && <AddLeaveModel onClose={closeModal} />}

          <div className="leave__tables">
            <div className="leave__apply">
              <p className="title">Applied Leaves</p>
              <table>
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Docs</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves
                    .filter((leave) => (statusFilter ? leave.status === statusFilter : true) && leave.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((leave) => (
                      <tr key={leave.id}>
                        <td><img src={ProfilePhoto} alt={leave.name} className="profile__img" /></td>
                        <td>{leave.name}</td>
                        <td>{new Date(leave.date).toLocaleDateString()}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <select onChange={(e) => handleStatusChange(leave.id, e.target.value)} value={leave.status}>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td>--</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="calendar__section">
              <p className="title">Leave Calendar</p>
              <div className="calendar__container">
                <Calendar onChange={onChange} value={value} />
              </div>
              <div className="approved__leaves">
                <h4>Approved Leaves</h4>
                {leaves.filter(leave => leave.status === 'Approved').map((leave) => (
                  <div key={leave.id} className="approved__leave__profiles">
                    <div className="leave__profile">
                      <img src={ProfilePhoto} alt={leave.name} className="profile__img" />
                      <p>{leave.name}</p>
                    </div>
                    <span>{new Date(leave.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
