import React, { useRef, useState, useEffect } from 'react';
import { FaImage, FaPaperclip, FaUserCircle, FaTimes } from 'react-icons/fa';
import { postService } from '../../services/postService';
import './ForumContent.css';

export default function ForumContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Không thể tải bài viết');
      console.error('Lỗi khi tải bài viết:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      const postData = {
        user_id: 1, // Tạm thời hardcode user_id
        title,
        content,
        image_url: image?.url
      };

      const newPost = await postService.createPost(postData);
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
            {post.image_url && (
              <img src={post.image_url} alt="" className="post-img" />
            )}
            <div className="post-info">
              <div className="post-tags">
                {post.tags?.map(tag => (
                  <span className="post-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <img src={post.avatar_url} alt="" className="post-avatar" />
                <span className="post-author">{post.username}</span>
                <span className="post-time">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className="post-views">{post.views} Views</span>
                <span className="post-likes">{post.likes} Likes</span>
                <span className="post-comments">{post.comment_count} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}