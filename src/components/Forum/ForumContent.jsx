import React, { useRef, useState } from 'react';
import { FaImage, FaPaperclip, FaUserCircle, FaTimes } from 'react-icons/fa';
import './ForumContent.css';

const posts = [
  {
    id: 1,
    title: 'Blockchain developer best practices on innovationchain',
    tags: ['finance', 'bitcoin', 'crypto'],
    author: 'Pavel Guay',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    time: '3 weeks ago',
    views: 653324,
    likes: 36654,
    comments: 56,
    image: 'https://i.ibb.co/6bQ7QpT/bitcoin-chart.png'
  },
  // ...thêm các post khác tương tự
];

export default function ForumContent() {
  // State cho phần tạo bài đăng
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const imageInputRef = useRef();
  const fileInputRef = useRef();

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

  return (
    <div className="forum-content">
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
          <button className="post-btn">Đăng bài</button>
        </div>
        {/* Hiển thị preview ảnh/file nếu có */}
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
      </div>
      <div className="posts-list">
        {posts.map(post => (
          <div className="post-card" key={post.id}>
            <img src={post.image} alt="" className="post-img" />
            <div className="post-info">
              <div className="post-tags">
                {post.tags.map(tag => <span className="post-tag" key={tag}>{tag}</span>)}
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <img src={post.avatar} alt="" className="post-avatar" />
                <span className="post-author">{post.author}</span>
                <span className="post-time">{post.time}</span>
                <span className="post-views">{post.views.toLocaleString()} Views</span>
                <span className="post-likes">{post.likes.toLocaleString()} Likes</span>
                <span className="post-comments">{post.comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}