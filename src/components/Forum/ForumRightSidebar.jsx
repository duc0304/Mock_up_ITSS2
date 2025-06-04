import React, { useState, useEffect } from 'react';
import { FaUsers, FaFire } from 'react-icons/fa';
import { groupService } from '../../services/groupService';
import './ForumRightSidebar.css';

const ForumRightSidebar = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fake data cho groups
      const fakeGroups = [
        { 
          id: 1, 
          name: "JavaScript Enthusiasts", 
          member_count: 1245,
          description: "Cộng đồng yêu thích JavaScript",
          isActive: true,
          latestActivity: "2 phút trước"
        },
        { 
          id: 2, 
          name: "React Developers", 
          member_count: 892,
          description: "Thảo luận về React và ecosystem",
          isActive: true,
          latestActivity: "5 phút trước"
        },
        { 
          id: 3, 
          name: "Career Guidance", 
          member_count: 634,
          description: "Tư vấn nghề nghiệp IT",
          isActive: false,
          latestActivity: "1 giờ trước"
        },
        { 
          id: 4, 
          name: "Learning Together", 
          member_count: 578,
          description: "Học tập cùng nhau",
          isActive: true,
          latestActivity: "10 phút trước"
        },
        { 
          id: 5, 
          name: "Python Developers", 
          member_count: 423,
          description: "Thảo luận về Python và AI",
          isActive: false,
          latestActivity: "3 giờ trước"
        },
        { 
          id: 6, 
          name: "Web Design", 
          member_count: 356,
          description: "UI/UX và Frontend Design",
          isActive: true,
          latestActivity: "15 phút trước"
        }
      ];
      
      setGroups(fakeGroups);
    } catch (err) {
      setError('Không thể tải dữ liệu');
      console.error('Lỗi khi tải dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupClick = (group) => {
    if (onGroupSelect) {
      onGroupSelect(group);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="forum-right-sidebar">
      <div className="sidebar-section">
        <h3><FaUsers /> Nhóm Hoạt Động</h3>
        <ul className="active-groups">
          {groups.map((group) => (
            <li 
              key={group.id}
              onClick={() => handleGroupClick(group)}
              className={group.isActive ? 'active-group' : ''}
            >
              <div className="group-info">
                <div className="group-name">
                  {group.isActive && <FaFire className="active-icon" />}
                  {group.name}
                </div>
                <div className="group-description">{group.description}</div>
                <div className="group-activity">{group.latestActivity}</div>
              </div>
              <div className="group-meta">
                <span className="member-count">
                  <FaUsers /> {group.member_count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForumRightSidebar; 