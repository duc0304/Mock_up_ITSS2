import React from 'react';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumSidebar from '../components/Forum/ForumSidebar';
import ForumContent from '../components/Forum/ForumContent';
import ForumRightSidebar from '../components/Forum/ForumRightSidebar';
import './Forum.css';

export default function Forum() {
  return (
    <div className="forum-page">
      <ForumHeader />
      <div className="forum-container">
        <ForumSidebar />
        <ForumContent />
        <ForumRightSidebar />
      </div>
    </div>
  );
}