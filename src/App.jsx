import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ChildPanel from './pages/ChildPanel'
import ParentPanel from './pages/ParentPanel'
import Dashboard from './pages/Dashboard'
import DragDropGame from './games/DragDropGame'
import ColoringGame from './games/ColoringGame'
import AttentionGame from './games/AttentionGame'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cocuk" element={<ChildPanel />} />
            <Route path="/cocuk/surukle-birak" element={<DragDropGame />} />
            <Route path="/cocuk/boyama" element={<ColoringGame />} />
            <Route path="/cocuk/dikkat" element={<AttentionGame />} />
            <Route path="/ebeveyn" element={<ParentPanel />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
