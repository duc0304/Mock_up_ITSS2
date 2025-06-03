import React, { useState, useEffect } from 'react';
import { FaFire, FaClock, FaUserFriends, FaHashtag, FaThumbtack, FaChevronRight } from 'react-icons/fa';
import { tagService } from '../../services/tagService';
import './ForumSidebar.css';

export default function ForumSidebar() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await tagService.getAllTags();
      setTags(data);
    } catch (err) {
      setError('Không thể tải tags');
      console.error('Lỗi khi tải tags:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

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
            <div className="tag-item" key={tag.id}>
              <FaHashtag /> {tag.name}
              <span className="tag-count">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}