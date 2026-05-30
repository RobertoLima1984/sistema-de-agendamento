// =============================================
//   ESPAÇO KIDS LOCAÇÕES — Sidebar Component
//   src/components/Sidebar.jsx
// =============================================

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, CalendarDays,
  Package, BarChart2, Sparkles, Sun, Moon,
} from 'lucide-react'

const navItems = [
  { to: '/',             icon: <LayoutDashboard size={18} />, label: 'Dashboard'      },
  { to: '/clientes',     icon: <Users           size={18} />, label: 'Clientes'       },
  { to: '/agendamentos', icon: <CalendarDays    size={18} />, label: 'Agendamentos'   },
  { to: '/inflaveis',    icon: <Package         size={18} />, label: 'Infláveis'      },
  { to: '/fluxo-caixa',  icon: <BarChart2       size={18} />, label: 'Fluxo de Caixa' },
]

export default function Sidebar({ darkMode, onToggleDark, drawerOpen, onClose }) {
  return (
    <aside className={`sidebar ${drawerOpen ? 'drawer-open' : ''}`}>

      {/* ── Logo ── */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <div className="sidebar-logo-name">
            Espaço Kids<br /><span>Locações</span>
          </div>
        </div>
      </div>

      {/* ── Navegação ── */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Menu</div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Rodapé ── */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onToggleDark}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {darkMode
              ? <Sun  size={14} style={{ color: '#FBBF24' }} />
              : <Moon size={14} />
            }
            <span>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </div>
          <div className={`theme-toggle-switch ${darkMode ? 'on' : ''}`}>
            <div className="theme-toggle-knob" />
          </div>
        </button>

        <div className="sidebar-footer-card">
          <div className="sidebar-footer-emoji">🎪</div>
          <div>
            <div className="sidebar-footer-title">EKL v1.0</div>
            <div className="sidebar-footer-sub">Sistema de gestão</div>
          </div>
        </div>
      </div>
    </aside>
  )
}