import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Chào mừng đến với Diễn đàn và Kho Tài liệu</h1>
        <p className="hero-text">
          Nơi bạn có thể kết nối, thảo luận và truy cập các tài liệu hữu ích.
        </p>
      </div>

      <div className="features-section">
        <div className="card">
          <h2 className="card-title">Diễn đàn Trực tuyến</h2>
          <p>
            Tham gia vào các cuộc thảo luận, đặt câu hỏi và chia sẻ kiến thức với
            cộng đồng.
          </p>
          <Link to="/forum" className="btn btn-primary">
            Truy cập Diễn đàn
          </Link>
        </div>

        <div className="card">
          <h2 className="card-title">Kho Tài liệu</h2>
          <p>
            Truy cập vào kho tài liệu phong phú được phân loại theo nhiều chủ đề
            khác nhau.
          </p>
          <Link to="/library" className="btn btn-primary">
            Khám phá Tài liệu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 