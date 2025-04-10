import React, { useState } from 'react'

const Library = () => {
  // Mock data cho danh mục và tài liệu
  const initialCategories = [
    { 
      id: 1, 
      name: 'Lập trình Web', 
      documents: [
        { id: 1, title: 'Tổng quan về HTML và CSS', description: 'Giới thiệu cơ bản về HTML5 và CSS3', type: 'PDF', size: '2.4 MB' },
        { id: 2, title: 'JavaScript cơ bản', description: 'Các khái niệm cơ bản về JavaScript', type: 'PDF', size: '3.1 MB' },
        { id: 3, title: 'Học ReactJS từ A đến Z', description: 'Hướng dẫn đầy đủ về ReactJS', type: 'PDF', size: '5.7 MB' },
      ]
    },
    { 
      id: 2, 
      name: 'Cơ sở dữ liệu', 
      documents: [
        { id: 1, title: 'SQL cơ bản', description: 'Hướng dẫn về ngôn ngữ truy vấn SQL', type: 'PDF', size: '4.2 MB' },
        { id: 2, title: 'MongoDB cho người mới bắt đầu', description: 'Giới thiệu về NoSQL và MongoDB', type: 'PDF', size: '3.8 MB' },
      ]
    },
    { 
      id: 3, 
      name: 'Học máy', 
      documents: [
        { id: 1, title: 'Nhập môn Machine Learning', description: 'Các khái niệm cơ bản về học máy', type: 'PDF', size: '6.3 MB' },
        { id: 2, title: 'Deep Learning với Python', description: 'Hướng dẫn thực hành Deep Learning', type: 'PDF', size: '8.1 MB' },
      ]
    }
  ]

  const [categories, setCategories] = useState(initialCategories)
  const [activeCategory, setActiveCategory] = useState(1)  // Mặc định hiển thị danh mục đầu tiên
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm) {
      setIsSearching(false)
      return
    }

    // Tìm kiếm trong tất cả danh mục
    const results = []
    categories.forEach(category => {
      const matchingDocs = category.documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      matchingDocs.forEach(doc => {
        results.push({
          ...doc,
          category: category.name
        })
      })
    })

    setSearchResults(results)
    setIsSearching(true)
  }

  // Tìm danh mục hiện tại
  const currentCategory = categories.find(cat => cat.id === activeCategory)

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Kho Tài liệu</h1>
        <p>Truy cập vào kho tài liệu phong phú được phân loại theo các chủ đề</p>
      </div>

      {/* Tìm kiếm */}
      <div className="card">
        <form onSubmit={handleSearch}>
          <div className="form-group search-form">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
          </div>
        </form>
      </div>

      <div className="library-content">
        {/* Danh mục bên trái */}
        <div className="categories-sidebar">
          <h2>Danh mục</h2>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category.id} 
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => { setActiveCategory(category.id); setIsSearching(false); }}
              >
                {category.name}
                <span className="document-count">{category.documents.length}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Danh sách tài liệu bên phải */}
        <div className="documents-section">
          {isSearching ? (
            <>
              <h2>Kết quả tìm kiếm: {searchResults.length} tài liệu</h2>
              
              {searchResults.length > 0 ? (
                <div className="documents-list">
                  {searchResults.map((doc) => (
                    <div className="document-card" key={`${doc.category}-${doc.id}`}>
                      <div className="document-icon">📄</div>
                      <div className="document-info">
                        <h3>{doc.title}</h3>
                        <p>{doc.description}</p>
                        <div className="document-meta">
                          <span>Danh mục: {doc.category}</span>
                          <span>{doc.type} • {doc.size}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary">Tải xuống</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Không tìm thấy tài liệu nào phù hợp với từ khóa "{searchTerm}"</p>
              )}
            </>
          ) : currentCategory ? (
            <>
              <h2>{currentCategory.name}</h2>
              
              <div className="documents-list">
                {currentCategory.documents.map((doc) => (
                  <div className="document-card" key={doc.id}>
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h3>{doc.title}</h3>
                      <p>{doc.description}</p>
                      <div className="document-meta">
                        <span>{doc.type} • {doc.size}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary">Tải xuống</button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Vui lòng chọn một danh mục</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Library 