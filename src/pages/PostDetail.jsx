import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postsService } from '../services/postsData'
import { commentService } from '../services/commentService'
import './PostDetail.css'; // Import the CSS file

const PostDetail = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newReply, setNewReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    loadPostAndComments()
  }, [postId])

  const loadPostAndComments = async () => {
    try {
      setLoading(true)
      // Sử dụng shared posts service
      const postData = postsService.getPostById(postId)
      
      if (!postData) {
        setError('Không tìm thấy bài viết')
        return
      }
      
      setPost(postData)
      // Sử dụng comments từ post data
      setComments(postData.comments || [])
    } catch (err) {
      setError('Có lỗi xảy ra khi tải bài viết')
      console.error('Lỗi khi tải bài viết:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleBackToForum = () => {
    navigate('/')
  }
  
  const handleSubmitReply = async () => {
    if (!newReply.trim()) return
    
    // Tạo comment mới
    const newComment = {
      id: comments.length + 1,
      post_id: parseInt(postId),
      user_id: 1, 
      username: "Bạn",
      avatar_url: "B",
      content: newReply.trim(),
      created_at: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    setNewReply('');
    
    // Cập nhật comment count trong post
    if (post) {
      setPost({
        ...post,
        comment_count: (post.comment_count || 0) + 1
      });
    }
  }
  
  if (loading) {
    return <div className="loading">Đang tải...</div>
  }
  
  if (error) {
    return <div className="error">{error}</div>
  }
  
  if (!post) {
    return <div className="error">Không tìm thấy bài viết</div>
  }
  
  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <button 
          className="btn btn-secondary back-button"
          onClick={handleBackToForum}
        >
          ← Quay lại trang chủ
        </button>
      </div>
      
      <div className="post-detail-wrapper">
        <div className="post-detail-card">
          <div className="post-detail-meta">
            <div className="post-author-info">
              <div className="author-avatar">
                {post.username ? post.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="author-details">
                <span className="post-author">{post.username}</span>
                <span className="post-time">{new Date(post.created_at).toLocaleString('vi-VN')}</span>
              </div>
            </div>
            
            <div className="post-category-info">
              <span className="post-category">{post.category}</span>
              <div className="post-actions">
                <button 
                  className="btn btn-upvote" 
                >
                  <span className="upvote-icon">❤️</span> {post.upvotes}
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-tags">
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
          
          <div className="post-detail-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="post-detail-replies">
            <h2 className="replies-heading">
              Bình luận ({comments.length})
            </h2>
            
            {comments.length > 0 ? (
              <div className="replies-list">
                {comments.map((comment) => (
                  <div className="reply" key={comment.id}>
                    <div className="reply-header">
                      <div className="reply-author-info">
                        <div className="author-avatar">{comment.avatar_url}</div>
                        <div className="reply-author-details">
                          <span className="reply-author">{comment.username}</span>
                          <span className="reply-time">
                            {new Date(comment.created_at).toLocaleString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="reply-content">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-replies">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
            )}
            
            <div className="reply-form">
              <h3 className="reply-form-title">Thêm bình luận</h3>
              <textarea
                className="form-control"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Nhập bình luận của bạn"
                rows="3"
              ></textarea>
              <button 
                className="btn btn-primary"
                onClick={handleSubmitReply}
                disabled={!newReply.trim()}
              >
                Gửi bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail 