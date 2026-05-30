// =============================================
//   INFLAFEST — App.jsx (Rotas)
//   src/App.jsx
// =============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar      from './components/Sidebar'
import Dashboard    from './pages/Dashboard'
import Clientes     from './pages/Clientes'
import Agendamentos from './pages/Agendamentos'
import Inflaveis    from './pages/Inflaveis'
import FluxoCaixa   from './pages/FluxoCaixa'

import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
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