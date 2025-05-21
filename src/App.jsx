import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Library from './pages/Library'
import PostDetail from './pages/PostDetail'
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="app-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Forum />} />
            <Route path="/forum/:postId" element={<PostDetail />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2023 - Diễn đàn và Kho Tài liệu</p>
        </footer>
        <SpeedInsights />
      </div>
    </Router>
  )
}

export default App
