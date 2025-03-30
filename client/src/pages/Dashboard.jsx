import React, { useState } from 'react';
import { HiOutlineUserAdd } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { BsBarChart } from "react-icons/bs";
import { PiShootingStarLight } from "react-icons/pi";
import { MdLogout, MdOutlineRectangle } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import Candidates from '../components/candidates/Candidates';
import Employee from '../components/employee/Employee';
import Attendance from '../components/attendance/Attendance';
import Leaves from '../components/leaves/Leaves';
import './dashboard.css';

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);
  const navigate = useNavigate();

  // Define categories with respective menu items
  const categories = [
    {
      name: 'Recruitment',
      items: [
        { id: 1, name: 'Candidates', icon: <HiOutlineUserAdd />, content: <Candidates /> },
      ],
    },
    {
      name: 'Organization',
      items: [
        { id: 2, name: 'Employees', icon: <FiUsers />, content: <Employee /> },
        { id: 3, name: 'Attendance', icon: <BsBarChart />, content: <Attendance /> },
        { id: 4, name: 'Leaves', icon: <PiShootingStarLight />, content: <Leaves /> },
      ],
    },
    {
      name: 'Others',
      items: [
        { id: 5, name: 'Logout', icon: <MdLogout />, action: () => navigate('/auth') },
      ],
    },
  ];

  const handleMenuItemClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setSelectedMenuItem(item.id);
    }
  };

  return (
    <div className="dashboard__page">
      <div className="dashboard__sidebar">
        <div className="logo">
          <MdOutlineRectangle /> <strong>logo</strong>
        </div>

        <div className="global__search">
          <form>
            <div className="input__group">
              <label htmlFor="search"><IoIosSearch /></label>
              <input type="text" placeholder='Search' />
            </div>
          </form>
        </div>

        <div className="side__navigation">
          {categories.map((category, index) => (
            <div key={index}>
              <h4>{category.name}</h4>
              <ul>
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className={selectedMenuItem === item.id ? 'active' : ''}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <span>{item.icon}</span>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        {selectedMenuItem && categories
          .flatMap(category => category.items)
          .find(item => item.id === selectedMenuItem)?.content}
      </div>
    </div>
  );
};

export default Dashboard;
