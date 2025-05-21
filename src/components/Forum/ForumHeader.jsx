import React from 'react';
import { FaSearch, FaBell, FaUser, FaComments } from 'react-icons/fa';
import './ForumHeader.css';

const ForumHeader = () => {
  return (
    <div className="forum-header">
      <div className="header-left">
        <span className="header-logo"><FaComments /></span>
        <h1>ITSS Forum</h1>
      </div>
      <div className="header-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Tìm kiếm bài viết..." />
        </div>
      </div>
      <div className="header-right">
        <FaBell className="header-icon" />
        <FaUser className="header-icon" />
      </div>
    </div>
  );
};

export default ForumHeader; 