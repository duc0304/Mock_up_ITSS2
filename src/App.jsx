import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Library from './pages/Library'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Diễn đàn và Kho Tài liệu</h1>
          <nav className="app-nav">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="/forum" className="nav-link">Diễn đàn</Link>
            <Link to="/library" className="nav-link">Kho Tài liệu</Link>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2023 - Diễn đàn và Kho Tài liệu</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
