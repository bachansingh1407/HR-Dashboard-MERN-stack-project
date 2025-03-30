import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../Header';
import { BsThreeDotsVertical } from 'react-icons/bs';
import '../manage.css';
import { AuthContext } from '../../context/authContext';
import ProfileImage from '../../assets/avtar2.png'

const Employee = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [token]);

  const filteredEmployees = employees.filter(employee =>
    (positionFilter === '' || employee.position.includes(positionFilter)) &&
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page">
      <Header headerTitle="Employee" />
      <div className="details">
        <div className="controls">
          <select value={positionFilter} className='control__btn' onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="">Position</option>
            {['Intern', 'Full Time', 'Junior', 'Senior', 'Team Lead'].map((position) => (
              <option key={position} value={position}>{position}</option>
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
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td><img src={ProfileImage} alt="profile" className="profile__img" /></td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                <td><BsThreeDotsVertical /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
