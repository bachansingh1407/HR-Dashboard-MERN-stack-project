import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../Header';
import { BsThreeDotsVertical } from 'react-icons/bs';
import '../manage.css';
import AddCandidateModel from '../models/AddCandidateModel';
import { AuthContext } from '../../context/authContext';

const Candidates = () => {
  const { token } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [token]);

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate =>
    (statusFilter === '' || candidate.status === statusFilter) &&
    (positionFilter === '' || candidate.position.includes(positionFilter)) &&
    (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || candidate.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="page">
      <Header headerTitle="Candidate" />
      <div className="details">
        <div className="controls">
          <div className="left__controls">
            <select value={statusFilter} className='control__btn' onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Status</option>
              {['New', 'Scheduled', 'Ongoing', 'Selected', 'Rejected'].map((status, index) => (
                <option key={`${status}-${index}`} value={status}>{status}</option>
              ))}
            </select>

            <select value={positionFilter} className='control__btn' onChange={(e) => setPositionFilter(e.target.value)}>
              <option value="">Position</option>
              {['Designer', 'Developer', 'Human Resource'].map((position, index) => (
                <option key={`${position}-${index}`} value={position}>{position}</option>
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

            <button className="add__candidate" onClick={openModal}>Add Candidate</button>
          </div>
        </div>

        {isModalOpen && <AddCandidateModel onClose={closeModal} />}

        <br />
        <p className="title"></p>
        <table>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidate Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate.id || `candidate-${index}`}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>+91 {candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>
                  <select value={candidate.status} onChange={(e) => console.log('Update status:', e.target.value)}>
                    {['New', 'Scheduled', 'Ongoing', 'Selected', 'Rejected'].map((status, idx) => (
                      <option key={`${status}-${idx}`} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td>{candidate.experience} years</td>
                <td><BsThreeDotsVertical /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
