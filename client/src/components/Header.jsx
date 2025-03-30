// Header.js
import React, { useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import HrProfileImage from '../assets/avtar1.png';


const HrProfile = ({handleNavigation}) => {
  return (
    <div className="dropdown__menu">
          <div onClick={() => handleNavigation('/edit-profile')}>Edit Profile</div>
          <div onClick={() => handleNavigation('/change-password')}>Change Password</div>
          <div onClick={() => handleNavigation('/manage-notifications')}>Manage Notifications</div>
        </div>
  )
}

const Header = ({ headerTitle }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <div className="header">
      <div className="header__left">{headerTitle}</div>
      <div className="header__right">
        <span className="icon" onClick={() => alert('Mail Clicked')}><MdOutlineEmail /></span>
        <span className="icon" onClick={() => alert('Notifications Clicked')}><IoNotificationsOutline /></span>
        <div className="profile__section" onClick={toggleDropdown}>
          <img src={HrProfileImage} alt="Profile" />
          <span className="dropdown__arrow"><MdKeyboardArrowDown /></span>
        </div>
      </div>

      {isDropdownOpen && <HrProfile handleNavigation={handleNavigation}/>}
    </div>
  );
};

export default Header;
