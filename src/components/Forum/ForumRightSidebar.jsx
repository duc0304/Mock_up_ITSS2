import React from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import './ForumRightSidebar.css';

const ForumRightSidebar = () => {
  const topContributors = [
    { name: 'Nguyễn Văn A', points: 1500, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Trần Thị B', points: 1200, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Lê Văn C', points: 1000, avatar: 'https://randomuser.me/api/portraits/men/65.jpg' }
  ];

  const activeGroups = [
    { name: 'React Developers', members: 150 },
    { name: 'JavaScript Enthusiasts', members: 200 },
    { name: 'Web Design', members: 100 }
  ];

  return (
    <div className="forum-right-sidebar">
      <div className="sidebar-section">
        <h3><FaTrophy /> Top Contributors</h3>
        <ul className="contributors-list">
          {topContributors.map((contributor, index) => (
            <li key={index}>
              <span className="rank">{index + 1}</span>
              <img src={contributor.avatar} alt="avatar" className="avatar" />
              <span className="name">{contributor.name}</span>
              <span className="points">{contributor.points} pts</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3><FaUsers /> Nhóm đang hoạt động</h3>
        <ul className="active-groups">
          {activeGroups.map((group, index) => (
            <li key={index}>
              <span className="group-name">{group.name}</span>
              <span className="member-count">{group.members} thành viên</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForumRightSidebar; 