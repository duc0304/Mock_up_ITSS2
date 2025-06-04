import React, { useRef, useState, useEffect } from 'react';
import { FaImage, FaPaperclip, FaUserCircle, FaTimes, FaHeart } from 'react-icons/fa';
import { postsService } from '../../services/postsData';
import './ForumContent.css';
import { useNavigate } from 'react-router-dom';

export default function ForumContent({ activeFilter, selectedTag, searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const navigate = useNavigate();
  
  // State cho phần tạo bài đăng
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const imageInputRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    loadPosts();
  }, []);

  // Filter posts khi activeFilter, selectedTag, hoặc searchQuery thay đổi
  useEffect(() => {
    filterPosts();
  }, [posts, activeFilter, selectedTag, likedPosts, searchQuery]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Sử dụng shared posts service
      const data = postsService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Không thể tải bài viết');
      console.error('Lỗi khi tải bài viết:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Filter theo activeFilter
    if (activeFilter === 'favourite') {
      filtered = filtered.filter(post => likedPosts.has(post.id));
    }

    // Filter theo selectedTag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      );
    }

    // Filter theo searchQuery
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  };

  const handleLikePost = (e, postId) => {
    e.stopPropagation();
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  };

  const getDisplayTitle = () => {
    if (searchQuery) {
      return `Kết quả tìm kiếm cho "${searchQuery}"`;
    }
    if (activeFilter === 'favourite') {
      return "Các bài viết bạn đã yêu thích";
    }
    if (selectedTag) {
      return `Các bài viết có gắn tag "${selectedTag}"`;
    }
    return "Bài viết mới nhất";
  };

  const handleCreatePost = async () => {
    try {
      const newPostData = {
        title,
        content,
        username: "Bạn",
        tags: [],
        userImage: image?.url || null,
        category: "Chung"
      };

      const newPost = postsService.addPost(newPostData);
      setPosts([newPost, ...posts]);
      
      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setFile(null);
    } catch (err) {
      console.error('Lỗi khi tạo bài viết:', err);
    }
  };

  // Xử lý chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        url: URL.createObjectURL(file)
      });
    }
  };
  // Xử lý chọn file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };
  // Xóa ảnh/file đã chọn
  const removeImage = () => setImage(null);
  const removeFile = () => setFile(null);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="forum-content">
      {/* Chỉ hiển thị create post khi không có filter đặc biệt */}
      {activeFilter === 'newest' && !selectedTag && !searchQuery && (
        <div className="create-post-card">
          <div className="create-post-header">
            <FaUserCircle className="create-avatar" />
            <input
              className="create-title"
              placeholder="Tiêu đề bài viết..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <textarea
            className="create-textarea"
            placeholder="Bạn đang nghĩ gì?"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="create-actions">
            <div className="action-buttons">
              <button
                className="action-btn"
                type="button"
                onClick={() => imageInputRef.current.click()}
              >
                <FaImage /> Ảnh
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageInputRef}
                onChange={handleImageChange}
              />
              <button
                className="action-btn"
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                <FaPaperclip /> File
              </button>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <button className="post-btn" onClick={handleCreatePost}>Đăng bài</button>
          </div>
          {/* Hiển thị preview ảnh/file nếu có */}
          {(image || file) && (
            <div className="preview-area">
              {image && (
                <div className="preview-item">
                  <img src={image.url} alt="preview" className="preview-img" />
                  <button className="remove-preview" onClick={removeImage}><FaTimes /></button>
                </div>
              )}
              {file && (
                <div className="preview-item file-preview">
                  <span>{file.name}</span>
                  <button className="remove-preview" onClick={removeFile}><FaTimes /></button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Header cho filtered content */}
      <div className="posts-header">
        <h2>{getDisplayTitle()}</h2>
        <span className="posts-count">{filteredPosts.length} bài viết</span>
      </div>
      
      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchQuery 
                ? `Không tìm thấy bài viết nào phù hợp với "${searchQuery}"`
                : activeFilter === 'favourite' 
                  ? "Bạn chưa yêu thích bài viết nào. Hãy bấm ❤️ vào các bài viết bạn thích!"
                  : selectedTag 
                    ? `Không có bài viết nào với tag "${selectedTag}"`
                    : "Chưa có bài viết nào."
              }
            </p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div 
              className="post-card" 
              key={post.id} 
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {/* Hiển thị ảnh user upload hoặc fallback */}
              <img 
                src={post.userImage || "/example.jpg"} 
                alt="" 
                className="post-img" 
                onError={(e) => {
                  e.target.src = "/example.jpg"; // Fallback nếu ảnh user bị lỗi
                }}
              />
              <div className="post-info">
                <div className="post-header">
                  <div className="post-author-avatar">
                    {post.username ? post.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="post-author-info">
                    <div className="post-author-name">{post.username || 'Người dùng'}</div>
                    <div className="post-time">{new Date(post.created_at || Date.now()).toLocaleDateString('vi-VN')}</div>
                  </div>
                </div>
                
                <div className="post-title">{post.title}</div>
                
                {post.content && (
                  <div className="post-content-preview">
                    {post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}
                  </div>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="post-tag">#{tag}</span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="post-tag">+{post.tags.length - 3}</span>
                    )}
                  </div>
                )}
                
                <div className="post-meta-condensed">
                  <div className="post-stats">
                    <span className="post-views">{post.views || 0} lượt xem</span>
                    <span className="post-comments">{post.comment_count || 0} bình luận</span>
                  </div>
                  <button 
                    className={`like-button ${likedPosts.has(post.id) ? 'liked' : ''}`}
                    onClick={(e) => handleLikePost(e, post.id)}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}