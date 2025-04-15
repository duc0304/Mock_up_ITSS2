import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forum = () => {
  // Mock data cho các bài đăng diễn đàn
  const initialPosts = [
    {
      id: 1,
      username: 'user123',
      avatar: '👨‍💻',
      title: 'Hỏi về React Hooks',
      content: 'Tôi đang gặp vấn đề khi sử dụng useEffect, có ai giúp được không? Tôi không hiểu tại sao component của tôi bị re-render liên tục khi tôi thêm một state vào dependency array.',
      timestamp: '2023-10-15 14:30',
      category: 'React',
      tags: ['reactjs', 'hooks', 'useEffect'],
      upvotes: 12,
      replies: [
        { id: 1, username: 'reactdev', avatar: '👩‍💻', content: 'Bạn cần kiểm tra dependency array. Nếu bạn đang sử dụng một object hoặc array, React sẽ coi đó là một tham chiếu mới mỗi khi component re-render. Hãy thử dùng useMemo hoặc useCallback.', timestamp: '2023-10-15 15:00', upvotes: 8 },
        { id: 2, username: 'webexpert', avatar: '🧑‍💻', content: 'Bạn có thể chia sẻ code của bạn không? Tôi nghĩ vấn đề có thể là do bạn tạo ra một hàm mới trong mỗi lần render và đưa nó vào dependency array.', timestamp: '2023-10-15 15:45', upvotes: 5 }
      ]
    },
    {
      id: 2,
      username: 'newbie',
      avatar: '🧑',
      title: 'Tài liệu học ReactJS',
      content: 'Mọi người có thể giới thiệu cho tôi tài liệu học ReactJS không ạ? Tôi là người mới bắt đầu và muốn tìm hiểu từ cơ bản đến nâng cao. Tôi đã có kiến thức về HTML, CSS và JavaScript.',
      timestamp: '2023-10-14 09:15',
      category: 'Học tập',
      tags: ['reactjs', 'tài liệu', 'beginner'],
      upvotes: 7,
      replies: [
        { id: 1, username: 'teacher01', avatar: '👨‍🏫', content: 'Bạn có thể tham khảo tài liệu chính thức tại reactjs.org. Ngoài ra, tôi khuyên bạn nên học qua các khóa học trên Udemy hoặc YouTube của các giảng viên như Stephen Grider, Maximilian Schwarzmüller, hoặc Kent C. Dodds.', timestamp: '2023-10-14 10:20', upvotes: 15 }
      ]
    },
    {
      id: 3,
      username: 'devops_pro',
      avatar: '👨‍🔧',
      title: 'Tối ưu quy trình CI/CD cho dự án React',
      content: 'Chào mọi người, tôi đang tìm cách tối ưu quy trình CI/CD cho dự án React của công ty. Hiện tại, việc build và deploy mất khá nhiều thời gian. Có ai đã từng gặp vấn đề này và có giải pháp không?',
      timestamp: '2023-10-13 11:45',
      category: 'DevOps',
      tags: ['ci/cd', 'performance', 'deployment'],
      upvotes: 19,
      replies: [
        { id: 1, username: 'ci_expert', avatar: '👩‍🔧', content: 'Tôi khuyên bạn nên sử dụng cache cho node_modules và build artifacts. Ngoài ra, bạn có thể xem xét việc sử dụng Turborepo hoặc Nx nếu dự án của bạn là monorepo.', timestamp: '2023-10-13 12:30', upvotes: 10 },
        { id: 2, username: 'cloud_master', avatar: '🧙‍♂️', content: 'Nếu bạn đang sử dụng AWS, hãy thử AWS Amplify. Nó có thể giảm thời gian build và deploy đáng kể.', timestamp: '2023-10-13 13:15', upvotes: 7 }
      ]
    }
  ]

  const navigate = useNavigate()
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' })
  const [activePost, setActivePost] = useState(null)
  const [newReply, setNewReply] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  // Các danh mục
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'React', name: 'React' },
    { id: 'Học tập', name: 'Học tập' },
    { id: 'DevOps', name: 'DevOps' },
  ]

  // Lọc bài viết theo danh mục
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  // Xử lý đăng bài mới
  const handleSubmitPost = (e) => {
    e.preventDefault()
    if (!newPost.title || !newPost.content) return

    const tagsArray = newPost.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const post = {
      id: posts.length + 1,
      username: 'current_user',
      avatar: '👤',
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date().toLocaleString(),
      category: 'Chung',
      tags: tagsArray,
      upvotes: 0,
      replies: []
    }

    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', tags: '' })
    setShowNewPostForm(false) // Ẩn form sau khi đăng bài
  }

  // Xử lý gửi trả lời
  const handleSubmitReply = (postId) => {
    if (!newReply) return

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newReplyObj = {
          id: post.replies.length + 1,
          username: 'current_user',
          avatar: '👤',
          content: newReply,
          timestamp: new Date().toLocaleString(),
          upvotes: 0
        }
        return { ...post, replies: [...post.replies, newReplyObj] }
      }
      return post
    })

    setPosts(updatedPosts)
    setNewReply('')
  }

  // Chuyển đến trang chi tiết bài viết
  const navigateToPostDetail = (postId) => {
    // Trong thực tế sẽ chuyển đến URL /forum/postId
    // Hiện tại ta giả lập lưu post đang xem vào localStorage
    localStorage.setItem('currentPost', JSON.stringify(posts.find(p => p.id === postId)))
    navigate(`/forum/${postId}`)
  }

  // Xử lý upvote cho bài đăng
  const handlePostUpvote = (e, postId) => {
    e.stopPropagation() // Ngăn sự kiện click lan tỏa tới parent element
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, upvotes: post.upvotes + 1 }
      }
      return post
    })
    setPosts(updatedPosts)
  }

  // Xử lý upvote cho bình luận
  const handleReplyUpvote = (postId, replyId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply => {
          if (reply.id === replyId) {
            return { ...reply, upvotes: reply.upvotes + 1 }
          }
          return reply
        })
        return { ...post, replies: updatedReplies }
      }
      return post
    })
    setPosts(updatedPosts)
  }

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Diễn đàn Thảo luận</h1>
        <p>Tham gia thảo luận và đặt câu hỏi với cộng đồng</p>
      </div>

      <div className="forum-layout">
        {/* Sidebar */}
        <div className="forum-sidebar">
          <div className="sidebar-section">
            <h3>Danh mục</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li 
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Thống kê</h3>
            <div className="forum-stats">
              <div className="stat-item">
                <span className="stat-value">{posts.length}</span>
                <span className="stat-label">Bài viết</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{posts.reduce((total, post) => total + post.replies.length, 0)}</span>
                <span className="stat-label">Bình luận</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="forum-main">
          {/* Button tạo bài đăng mới */}
          <div className="new-post-button-container">
            <button 
              className="btn btn-primary new-post-button" 
              onClick={() => setShowNewPostForm(!showNewPostForm)}
            >
              {showNewPostForm ? 'Hủy' : '✏️ Tạo bài đăng mới'}
            </button>
          </div>

          {/* Form đăng bài mới */}
          {showNewPostForm && (
            <div className="card create-post">
              <h2 className="card-title">Tạo bài đăng mới</h2>
              <form onSubmit={handleSubmitPost}>
                <div className="form-group">
                  <label className="form-label">Tiêu đề</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Nhập tiêu đề bài viết"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nội dung</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Nhập nội dung bài viết"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Tags (phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="Ví dụ: reactjs, hooks, javascript"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowNewPostForm(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Đăng bài</button>
                </div>
              </form>
            </div>
          )}

          {/* Danh sách bài đăng */}
          <div className="forum-posts">
            <div className="posts-header">
              <h2>Bài đăng {selectedCategory !== 'all' ? `về ${selectedCategory}` : 'gần đây'}</h2>
              <div className="posts-count">{filteredPosts.length} bài viết</div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="empty-state">
                <p>Không có bài viết nào trong danh mục này. Hãy là người đầu tiên đăng bài!</p>
              </div>
            ) : (
              <div className="posts-list-view">
                <table className="posts-table">
                  <thead>
                    <tr>
                      <th className="post-title-header">Tiêu đề</th>
                      <th className="post-author-header">Tác giả</th>
                      <th className="post-category-header">Danh mục</th>
                      <th className="post-stats-header">Thống kê</th>
                      <th className="post-date-header">Ngày đăng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr 
                        key={post.id} 
                        className="post-row"
                        onClick={() => navigateToPostDetail(post.id)}
                      >
                        <td className="post-title-cell">
                          <div className="post-title">{post.title}</div>
                          {post.tags.length > 0 && (
                            <div className="post-tags-inline">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="tag-inline">{tag}</span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="post-author-cell">
                          <div className="post-author-wrapper">
                            <span className="author-avatar-small">{post.avatar}</span>
                            <span className="post-author">{post.username}</span>
                          </div>
                        </td>
                        <td className="post-category-cell">
                          <span className="post-category-badge">{post.category}</span>
                        </td>
                        <td className="post-stats-cell">
                          <div className="post-stats">
                            <div className="stat">
                              <span className="stat-icon">👍</span>
                              <span className="stat-count">{post.upvotes}</span>
                              <button 
                                className="vote-btn" 
                                onClick={(e) => handlePostUpvote(e, post.id)}
                                title="Upvote"
                              >
                                +
                              </button>
                            </div>
                            <div className="stat">
                              <span className="stat-icon">💬</span>
                              <span className="stat-count">{post.replies.length}</span>
                            </div>
                          </div>
                        </td>
                        <td className="post-date-cell">
                          <span className="post-date">{post.timestamp.split(' ')[0]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum 