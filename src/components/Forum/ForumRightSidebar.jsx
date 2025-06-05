import React, { useState, useEffect } from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import { groupService } from '../../services/groupService';
import './ForumRightSidebar.css';

const ForumRightSidebar = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getAllGroups();
      setGroups(data);
    } catch (err) {
      setError('Không thể tải nhóm');
      console.error('Lỗi khi tải nhóm:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="forum-right-sidebar">
      <div className="sidebar-section">
        <h3><FaUsers /> Nhóm đang hoạt động</h3>
        <ul className="active-groups">
          {groups.map((group) => (
            <li key={group.id}>
              <span className="group-name">{group.name}</span>
              <span className="member-count">{group.member_count} thành viên</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForumRightSidebar; 