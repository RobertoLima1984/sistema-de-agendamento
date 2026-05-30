// =============================================
//   ESPAÇO KIDS LOCAÇÕES — App.jsx
//   src/App.jsx
// =============================================

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'

import Sidebar      from './components/Sidebar'
import Dashboard    from './pages/Dashboard'
import Clientes     from './pages/Clientes'
import Agendamentos from './pages/Agendamentos'
import Inflaveis    from './pages/Inflaveis'
import FluxoCaixa   from './pages/FluxoCaixa'

import './styles/global.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ekl-theme') === 'dark'
  })

  const [drawerOpen, setDrawerOpen] = useState(false)

  // Aplica dark mode no <html>
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('ekl-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      localStorage.setItem('ekl-theme', 'light')
    }
  }, [darkMode])

  // Fecha drawer ao redimensionar para tela grande
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 600) setDrawerOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function closeDrawer() {
    setDrawerOpen(false)
  }

  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* ── Topbar mobile (só aparece em telas pequenas) ── */}
        <div className="mobile-topbar">
          <div className="mobile-topbar-logo">
            <div className="mobile-topbar-logo-icon">
              <Sparkles size={16} />
            </div>
            <div className="mobile-topbar-name">
              Espaço Kids <span>Locações</span>
            </div>
          </div>
          <button
            className="hamburger-btn"
            onClick={() => setDrawerOpen(o => !o)}
            aria-label="Abrir menu"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Overlay escuro quando drawer aberto ── */}
        <div
          className={`sidebar-overlay ${drawerOpen ? 'open' : ''}`}
          onClick={closeDrawer}
        />

        {/* ── Sidebar (drawer no mobile) ── */}
        <Sidebar
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          drawerOpen={drawerOpen}
          onClose={closeDrawer}
        />

        {/* ── Conteúdo principal ── */}
        <main className="main-content">
          <Routes>
            <Route path="/"             element={<Dashboard />}    />
            <Route path="/clientes"     element={<Clientes />}     />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/inflaveis"    element={<Inflaveis />}    />
            <Route path="/fluxo-caixa"  element={<FluxoCaixa />}   />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}