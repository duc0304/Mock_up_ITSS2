import React from 'react';
import { FaFire, FaClock, FaUserFriends, FaHashtag, FaThumbtack, FaChevronRight } from 'react-icons/fa';
import './ForumSidebar.css';

const tags = [
  { name: 'javascript', count: 2452 },
  { name: 'bitcoin', count: 1930 },
  { name: 'design', count: 1821 },
  { name: 'innovation', count: 1520 },
  { name: 'editorial', count: 1345 },
  { name: 'business', count: 1295 },
];

const pinnedGroups = [
  { name: 'javascript', count: 2452 },
  { name: 'bitcoin', count: 1930 },
  { name: 'design', count: 1821 },
  { name: 'blogging', count: 1520 },
  { name: 'tutorial', count: 1345 },
];

export default function ForumSidebar() {
  return (
    <aside className="forum-sidebar">
      <div className="sidebar-block">
        <div className="sidebar-menu">
          <div className="menu-item active"><FaClock /> Newest and Recent</div>
          <div className="menu-item"><FaFire /> Popular of the day</div>
          <div className="menu-item"><FaUserFriends /> Following</div>
        </div>
      </div>
      <div className="sidebar-block">
        <div className="sidebar-title">Popular Tags</div>
        <div className="sidebar-tags">
          {tags.map(tag => (
            <div className="tag-item" key={tag.name}>
              <FaHashtag /> {tag.name}
              <span className="tag-count">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-block">
        <div className="sidebar-title pinned-title">
          Pinned Group <FaChevronRight />
        </div>
        <div className="sidebar-tags">
          {pinnedGroups.map(tag => (
            <div className="tag-item" key={tag.name}>
              <FaThumbtack /> {tag.name}
              <span className="tag-count">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}