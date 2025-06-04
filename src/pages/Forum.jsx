import React, { useState } from 'react';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumSidebar from '../components/Forum/ForumSidebar';
import ForumContent from '../components/Forum/ForumContent';
import ForumRightSidebar from '../components/Forum/ForumRightSidebar';
import './Forum.css';

export default function Forum() {
  const [activeFilter, setActiveFilter] = useState('newest');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedTag(null); // Reset tag khi đổi filter
    setSelectedGroup(null); // Reset group khi đổi filter
    setSearchQuery(''); // Reset search khi đổi filter
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setActiveFilter('newest'); // Reset về newest khi chọn tag
    setSelectedGroup(null); // Reset group
    setSearchQuery(''); // Reset search khi chọn tag
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    // Có thể thêm logic để hiển thị posts của group này
    alert(`Tham gia nhóm "${group.name}"\n${group.description}\n\nTính năng này sẽ được phát triển trong tương lai để:\n- Xem bài viết của nhóm\n- Tham gia thảo luận riêng\n- Chat với thành viên khác`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveFilter('newest'); // Reset về newest khi search
    setSelectedTag(null); // Reset tag khi search
    setSelectedGroup(null); // Reset group khi search
  };

  // Clear filters function
  const clearFilters = () => {
    setActiveFilter('newest');
    setSelectedTag(null);
    setSelectedGroup(null);
    setSearchQuery('');
  };

  return (
    <div className="forum-page">
      <ForumHeader onSearch={handleSearch} />
      <div className="forum-container">
        <ForumSidebar 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onTagSelect={handleTagSelect}
        />
        <ForumContent 
          activeFilter={activeFilter}
          selectedTag={selectedTag}
          selectedGroup={selectedGroup}
          searchQuery={searchQuery}
        />
        <ForumRightSidebar 
          onGroupSelect={handleGroupSelect}
        />
      </div>
    </div>
  );
}