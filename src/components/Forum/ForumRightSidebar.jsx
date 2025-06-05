import React, { useState, useEffect } from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import { groupService } from '../../services/groupService';
import './ForumRightSidebar.css';

const ForumRightSidebar = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

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

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedGroup(null);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="forum-right-sidebar">
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <h3>🚧 Chức năng đang phát triển</h3>
            <p>Nhóm: <strong>{selectedGroup?.name}</strong></p>
            <p>Chức năng chi tiết nhóm sẽ được phát triển trong tương lai với các tính năng:</p>
            <ul>
              <li>📝 Xem thông tin chi tiết nhóm</li>
              <li>👥 Danh sách thành viên</li>
              <li>💬 Chat nhóm</li>
              <li>📚 Tài liệu chia sẻ</li>
              <li>🎯 Hoạt động nhóm</li>
            </ul>
            <p>Vui lòng theo dõi để cập nhật phiên bản mới!</p>
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3><FaUsers /> Nhóm đang hoạt động</h3>
        <ul className="active-groups">
          {groups.map((group) => (
            <li key={group.id} onClick={() => handleGroupClick(group)} style={{cursor: 'pointer'}}>
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