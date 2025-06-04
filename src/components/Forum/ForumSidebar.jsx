import React, { useState, useEffect } from 'react';
import { FaHeart, FaClock, FaHashtag } from 'react-icons/fa';
import { tagService } from '../../services/tagService';
import './ForumSidebar.css';

export default function ForumSidebar({ activeFilter, onFilterChange, onTagSelect }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setLoading(true);
      // Fake data cho tags
      const fakeTagsData = [
        { id: 1, name: 'javascript', count: 2452 },
        { id: 2, name: 'react', count: 1930 },
        { id: 3, name: 'tiếng-nhật', count: 1821 },
        { id: 4, name: 'python', count: 1654 },
        { id: 5, name: 'career', count: 892 },
        { id: 6, name: 'học-tập', count: 756 },
        { id: 7, name: 'nodejs', count: 523 },
        { id: 8, name: 'frontend', count: 445 }
      ];
      setTags(fakeTagsData);
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
          <div 
            className={`menu-item ${activeFilter === 'newest' ? 'active' : ''}`}
            onClick={() => onFilterChange('newest')}
          >
            <FaClock /> Newest and Recent
          </div>
          <div 
            className={`menu-item ${activeFilter === 'favourite' ? 'active' : ''}`}
            onClick={() => onFilterChange('favourite')}
          >
            <FaHeart /> Favourite
          </div>
        </div>
      </div>
      
      <div className="sidebar-block">
        <div className="sidebar-title">Popular Tags</div>
        <div className="sidebar-tags">
          {tags.map(tag => (
            <div 
              className="tag-item" 
              key={tag.id}
              onClick={() => onTagSelect(tag.name)}
            >
              <FaHashtag /> {tag.name}
              <span className="tag-count">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}