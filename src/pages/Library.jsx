import React, { useState } from 'react'

const Library = () => {
  // Mock data cho danh mục và tài liệu
  const initialCategories = [
    { 
      id: 1, 
      name: 'Lập trình Web', 
      documents: [
        { id: 1, title: 'Tổng quan về HTML và CSS', description: 'Giới thiệu cơ bản về HTML5 và CSS3', content: 'HTML5 và CSS3 là những công nghệ cốt lõi để xây dựng trang web hiện đại. HTML định nghĩa cấu trúc và nội dung của trang web, trong khi CSS kiểm soát giao diện và định dạng. Cùng nhau, chúng tạo nên nền tảng cho mọi trang web bạn thấy trên Internet ngày nay.', type: 'PDF', size: '2.4 MB' },
        { id: 2, title: 'JavaScript cơ bản', description: 'Các khái niệm cơ bản về JavaScript', content: 'JavaScript là ngôn ngữ lập trình phổ biến nhất trên web. Nó cho phép bạn thêm các tính năng tương tác vào trang web của mình. JavaScript có thể thay đổi nội dung HTML, xử lý sự kiện, tạo hiệu ứng động, và nhiều hơn nữa.', type: 'PDF', size: '3.1 MB' },
        { id: 3, title: 'Học ReactJS từ A đến Z', description: 'Hướng dẫn đầy đủ về ReactJS', content: 'ReactJS là một thư viện JavaScript để xây dựng giao diện người dùng. Nó được phát triển bởi Facebook và được sử dụng rộng rãi cho các ứng dụng web hiện đại. React sử dụng khái niệm component, cho phép bạn tạo các phần giao diện có thể tái sử dụng.', type: 'PDF', size: '5.7 MB' },
      ]
    },
    { 
      id: 2, 
      name: 'Cơ sở dữ liệu', 
      documents: [
        { id: 1, title: 'SQL cơ bản', description: 'Hướng dẫn về ngôn ngữ truy vấn SQL', content: 'SQL (Structured Query Language) là ngôn ngữ tiêu chuẩn để tương tác với cơ sở dữ liệu quan hệ. Nó cho phép bạn truy vấn, thêm, cập nhật và xóa dữ liệu. Các lệnh SQL cơ bản bao gồm SELECT, INSERT, UPDATE, DELETE, và nhiều câu lệnh khác.', type: 'PDF', size: '4.2 MB' },
        { id: 2, title: 'MongoDB cho người mới bắt đầu', description: 'Giới thiệu về NoSQL và MongoDB', content: 'MongoDB là một cơ sở dữ liệu NoSQL phổ biến, lưu trữ dữ liệu dưới dạng tài liệu JSON. Không giống như cơ sở dữ liệu SQL truyền thống, MongoDB không yêu cầu cấu trúc cố định. Điều này làm cho nó linh hoạt hơn và phù hợp cho các ứng dụng có dữ liệu thay đổi.', type: 'PDF', size: '3.8 MB' },
      ]
    },
    { 
      id: 3, 
      name: 'Học máy', 
      documents: [
        { id: 1, title: 'Nhập môn Machine Learning', description: 'Các khái niệm cơ bản về học máy', content: 'Machine Learning là một nhánh của trí tuệ nhân tạo (AI) cho phép máy tính học từ dữ liệu và cải thiện theo thời gian. Các thuật toán học máy cơ bản bao gồm hồi quy tuyến tính, phân loại, cây quyết định, và mạng neural.', type: 'PDF', size: '6.3 MB' },
        { id: 2, title: 'Deep Learning với Python', description: 'Hướng dẫn thực hành Deep Learning', content: 'Deep Learning là một kỹ thuật học máy sử dụng mạng neural nhiều lớp để phân tích dữ liệu. Python là ngôn ngữ lập trình phổ biến nhất cho Deep Learning với các thư viện như TensorFlow, PyTorch, và Keras giúp đơn giản hóa việc xây dựng và huấn luyện mô hình.', type: 'PDF', size: '8.1 MB' },
      ]
    }
  ]

  const [categories, setCategories] = useState(initialCategories)
  const [activeCategory, setActiveCategory] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [translatedContent, setTranslatedContent] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

  // Danh sách ngôn ngữ hỗ trợ dịch
  const languages = [
    { code: 'en', name: 'Tiếng Anh' },
    { code: 'zh', name: 'Tiếng Trung' },
    { code: 'fr', name: 'Tiếng Pháp' },
    { code: 'de', name: 'Tiếng Đức' },
    { code: 'ja', name: 'Tiếng Nhật' },
    { code: 'ko', name: 'Tiếng Hàn' },
    { code: 'ru', name: 'Tiếng Nga' },
  ]

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

  // Xử lý xem chi tiết tài liệu
  const handleViewDocument = (doc) => {
    setSelectedDoc(doc)
    setTranslatedContent('') // Reset nội dung dịch
  }

  // Xử lý dịch tài liệu
  const handleTranslate = () => {
    if (!selectedDoc) return
    
    setIsTranslating(true)
    
    // Mock API dịch (trong thực tế sẽ gọi API dịch thực)
    setTimeout(() => {
      // Giả lập kết quả dịch
      const translations = {
        'en': 'This document contains information about ' + selectedDoc.title + ' in English. ' + 
              'The content is translated using an automated translation service. ' + 
              'Please note that automated translations may not be perfect.',
        'zh': selectedDoc.title + ' 的中文信息。使用自动翻译服务翻译的内容。请注意，自动翻译可能不完美。',
        'fr': 'Ce document contient des informations sur ' + selectedDoc.title + ' en français. ' +
              'Le contenu est traduit à l\'aide d\'un service de traduction automatique. ' +
              'Veuillez noter que les traductions automatisées peuvent ne pas être parfaites.',
        'de': 'Dieses Dokument enthält Informationen über ' + selectedDoc.title + ' auf Deutsch. ' +
              'Der Inhalt wird mit einem automatischen Übersetzungsdienst übersetzt. ' +
              'Bitte beachten Sie, dass automatische Übersetzungen möglicherweise nicht perfekt sind.',
        'ja': selectedDoc.title + ' に関する日本語の情報です。自動翻訳サービスを使用して翻訳されたコンテンツ。自動翻訳は完璧ではない場合があることに注意してください。',
        'ko': selectedDoc.title + '에 대한 한국어 정보입니다. 자동 번역 서비스를 사용하여 번역된 콘텐츠. 자동 번역은 완벽하지 않을 수 있습니다.',
        'ru': 'Этот документ содержит информацию о ' + selectedDoc.title + ' на русском языке. ' +
              'Содержимое переведено с помощью службы автоматического перевода. ' +
              'Обратите внимание, что автоматические переводы могут быть не идеальными.'
      }
      
      setTranslatedContent(translations[selectedLanguage] || 'Không có bản dịch cho ngôn ngữ này.')
      setIsTranslating(false)
    }, 1000) // Giả lập thời gian call API
  }

  // Tìm danh mục hiện tại
  const currentCategory = categories.find(cat => cat.id === activeCategory)

  // Đóng xem chi tiết
  const handleCloseDocument = () => {
    setSelectedDoc(null)
    setTranslatedContent('')
  }

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Kho Tài liệu</h1>
        <p>Truy cập vào kho tài liệu phong phú được phân loại theo các chủ đề</p>
      </div>

      {/* Chi tiết tài liệu */}
      {selectedDoc && (
        <div className="card document-detail">
          <div className="document-detail-header">
            <h2>{selectedDoc.title}</h2>
            <button 
              className="btn btn-secondary btn-close" 
              onClick={handleCloseDocument}
            >
              &times;
            </button>
          </div>
          
          <div className="document-detail-meta">
            <span className="document-type">{selectedDoc.type}</span>
            <span className="document-size">{selectedDoc.size}</span>
            {selectedDoc.category && (
              <span className="document-category">Danh mục: {selectedDoc.category}</span>
            )}
          </div>
          
          <p className="document-description">{selectedDoc.description}</p>
          
          <div className="document-content">
            <h3>Nội dung mẫu:</h3>
            <p>{selectedDoc.content}</p>
          </div>
          
          {/* Phần dịch tài liệu */}
          <div className="translation-container">
            <div className="translation-header">
              <h4>Dịch tài liệu</h4>
              
              <div className="language-selector">
                <label>Ngôn ngữ:</label>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                
                <button 
                  className="btn btn-primary btn-translate"
                  onClick={handleTranslate}
                  disabled={isTranslating}
                >
                  {isTranslating ? 'Đang dịch...' : 'Dịch'}
                </button>
              </div>
            </div>
            
            {translatedContent && (
              <div className="translated-content">
                <p>{translatedContent}</p>
              </div>
            )}
          </div>
          
          <div className="document-actions">
            <button className="btn btn-primary">Tải xuống</button>
          </div>
        </div>
      )}

      {!selectedDoc && (
        <>
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
                          <div className="document-buttons">
                            <button 
                              className="btn btn-secondary"
                              onClick={() => handleViewDocument(doc)}
                            >
                              Xem chi tiết
                            </button>
                            <button className="btn btn-primary">Tải xuống</button>
                          </div>
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
                        <div className="document-buttons">
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleViewDocument(doc)}
                          >
                            Xem chi tiết
                          </button>
                          <button className="btn btn-primary">Tải xuống</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>Vui lòng chọn một danh mục</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Library 