import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser, FaComments } from 'react-icons/fa';
import './ForumHeader.css';

const ForumHeader = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showSuccessToast = (message) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      showSuccessToast(`Đã tìm kiếm: "${searchQuery.trim()}"`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="forum-header">
      {showToast && (
        <div className="toast-success">
          <span>✅ Đã tìm kiếm: "{searchQuery.trim()}"</span>
        </div>
      )}
      
      <div className="header-left">
        <span className="header-logo"><FaComments /></span>
        <h1>ITSS Forum</h1>
      </div>
      <div className="header-center">
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
      </div>
      <div className="header-right">
        <FaBell className="header-icon" />
        <FaUser className="header-icon" />
      </div>
    </div>
  );
};

export default ForumHeader; 