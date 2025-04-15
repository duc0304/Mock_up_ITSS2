import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const PostDetail = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [newReply, setNewReply] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Trong thực tế sẽ fetch dữ liệu từ API
    // Hiện tại ta giả lập lấy dữ liệu từ localStorage
    const loadPost = () => {
      try {
        const postData = JSON.parse(localStorage.getItem('currentPost'))
        if (postData && postData.id.toString() === postId) {
          setPost(postData)
        } else {
          // Nếu không tìm thấy bài viết, chuyển về trang diễn đàn
          navigate('/forum')
        }
      } catch (error) {
        console.error('Error loading post:', error)
        navigate('/forum')
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
  }, [postId, navigate])
  
  const handleBackToForum = () => {
    navigate('/forum')
  }
  
  // Xử lý gửi trả lời
  const handleSubmitReply = () => {
    if (!newReply) return
    
    const newReplyObj = {
      id: post.replies.length + 1,
      username: 'current_user',
      avatar: '👤',
      content: newReply,
      timestamp: new Date().toLocaleString(),
      upvotes: 0
    }
    
    const updatedPost = {
      ...post,
      replies: [...post.replies, newReplyObj]
    }
    
    // Cập nhật state và localStorage
    setPost(updatedPost)
    localStorage.setItem('currentPost', JSON.stringify(updatedPost))
    setNewReply('')
  }
  
  // Xử lý upvote cho bài đăng
  const handlePostUpvote = () => {
    const updatedPost = {
      ...post,
      upvotes: post.upvotes + 1
    }
    
    setPost(updatedPost)
    localStorage.setItem('currentPost', JSON.stringify(updatedPost))
  }
  
  // Xử lý upvote cho bình luận
  const handleReplyUpvote = (replyId) => {
    const updatedReplies = post.replies.map(reply => {
      if (reply.id === replyId) {
        return { ...reply, upvotes: reply.upvotes + 1 }
      }
      return reply
    })
    
    const updatedPost = {
      ...post,
      replies: updatedReplies
    }
    
    setPost(updatedPost)
    localStorage.setItem('currentPost', JSON.stringify(updatedPost))
  }
  
  if (loading) {
    return <div className="loading">Đang tải...</div>
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
          ← Quay lại diễn đàn
        </button>
      </div>
      
      <div className="post-detail-card">
        <div className="post-detail-meta">
          <div className="post-author-info">
            <div className="author-avatar">{post.avatar}</div>
            <div className="author-details">
              <span className="post-author">{post.username}</span>
              <span className="post-time">{post.timestamp}</span>
            </div>
          </div>
          
          <div className="post-category-info">
            <span className="post-category">{post.category}</span>
            <div className="post-actions">
              <button 
                className="btn btn-upvote" 
                onClick={handlePostUpvote}
              >
                <span className="upvote-icon">▲</span> {post.upvotes}
              </button>
            </div>
          </div>
        </div>
        
        <h1 className="post-detail-title">{post.title}</h1>
        
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="post-detail-content">
          <p>{post.content}</p>
        </div>
        
        <div className="post-detail-replies">
          <h2 className="replies-heading">
            Bình luận ({post.replies.length})
          </h2>
          
          {post.replies.length > 0 ? (
            <div className="replies-list">
              {post.replies.map((reply) => (
                <div className="reply" key={reply.id}>
                  <div className="reply-header">
                    <div className="reply-author-info">
                      <div className="author-avatar">{reply.avatar}</div>
                      <div className="reply-author-details">
                        <span className="reply-author">{reply.username}</span>
                        <span className="reply-time">{reply.timestamp}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-sm btn-upvote"
                      onClick={() => handleReplyUpvote(reply.id)}
                    >
                      <span className="upvote-icon">▲</span> {reply.upvotes}
                    </button>
                  </div>
                  <p className="reply-content">{reply.content}</p>
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
              disabled={!newReply}
            >
              Gửi bình luận
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail 