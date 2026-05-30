// =============================================
//   INFLAFEST — Clientes Page
//   src/pages/Clientes.jsx
// =============================================

import { useState } from 'react'
import { UserPlus, Search, Trash2, Eye } from 'lucide-react'

import Modal from '../components/Modal'
import Badge from '../components/Badge'
import { clientes as clientesIniciais, formatCurrency, formatDate } from '../data/mockData'

export default function Clientes() {
  const [clientes, setClientes]     = useState(clientesIniciais)
  const [busca, setBusca]           = useState('')
  const [modalNovo, setModalNovo]   = useState(false)
  const [modalVer, setModalVer]     = useState(null) // cliente selecionado
  const [form, setForm]             = useState(formVazio())

  // ── Filtro de busca ───────────────────────
  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.includes(busca)
  )

  // ── Handlers do formulário ────────────────
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSalvar() {
    if (!form.nome || !form.telefone) return alert('Nome e telefone são obrigatórios.')
    const novo = {
      id: clientes.length + 1,
      ...form,
      totalAgendamentos: 0,
      totalGasto: 0,
      dataCadastro: new Date().toISOString().split('T')[0],
    }
    setClientes(prev => [novo, ...prev])
    setForm(formVazio())
    setModalNovo(false)
  }

  function handleExcluir(id) {
    if (!confirm('Deseja excluir este cliente?')) return
    setClientes(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Clientes</h2>
          <p>{clientes.length} clientes cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalNovo(true)}>
          <UserPlus size={15} />
          Novo Cliente
        </button>
      </div>

      {/* Busca */}
      <div className="search-bar mb-16">
        <Search size={15} />
        <input
          className="search-input"
          placeholder="Buscar por nome, cidade ou telefone..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Agendamentos</th>
              <th>Total Gasto</th>
              <th>Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)' }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="client-avatar-row">
                      <div className="client-avatar">
                        {initials(c.nome)}
                      </div>
                      <div>
                        <div className="td-name">{c.nome}</div>
                        <div className="td-sub">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.telefone}</td>
                  <td>{c.cidade}</td>
                  <td>
                    <span className="td-name">{c.totalAgendamentos}</span>
                  </td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                    {formatCurrency(c.totalGasto)}
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>
                    {formatDate(c.dataCadastro)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-sm btn-icon"
                        title="Ver detalhes"
                        onClick={() => setModalVer(c)}
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        className="btn btn-sm btn-icon btn-danger"
                        title="Excluir"
                        onClick={() => handleExcluir(c.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modal Novo Cliente ── */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Cliente"
      >
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome completo *</label>
            <input
              className="form-control"
              name="nome"
              placeholder="Ex: Ana Paula Ferreira"
              value={form.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Telefone *</label>
            <input
              className="form-control"
              name="telefone"
              placeholder="(47) 99999-9999"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cidade</label>
            <input
              className="form-control"
              name="cidade"
              placeholder="Ituporanga"
              value={form.cidade}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Observações</label>
          <textarea
            className="form-control"
            name="observacoes"
            placeholder="Informações adicionais..."
            value={form.observacoes}
            onChange={handleChange}
          />
        </div>
        <Modal.Footer>
          <button className="btn" onClick={() => { setModalNovo(false); setForm(formVazio()) }}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSalvar}>
            Salvar Cliente
          </button>
        </Modal.Footer>
      </Modal>

      {/* ── Modal Ver Cliente ── */}
      <Modal
        open={!!modalVer}
        onClose={() => setModalVer(null)}
        title="Detalhes do Cliente"
      >
        {modalVer && (
          <div>
            <div className="client-detail-header">
              <div className="client-avatar client-avatar-lg">
                {initials(modalVer.nome)}
              </div>
              <div>
                <div className="client-detail-name">{modalVer.nome}</div>
                <div className="client-detail-sub">{modalVer.email}</div>
              </div>
            </div>
            <div className="divider" />
            <div className="detail-grid">
              <DetailItem label="Telefone"      value={modalVer.telefone} />
              <DetailItem label="Cidade"        value={modalVer.cidade} />
              <DetailItem label="Cadastro"      value={formatDate(modalVer.dataCadastro)} />
              <DetailItem label="Agendamentos"  value={modalVer.totalAgendamentos} />
              <DetailItem
                label="Total Gasto"
                value={formatCurrency(modalVer.totalGasto)}
                highlight
              />
            </div>
            {modalVer.observacoes && (
              <>
                <div className="divider" />
                <div className="form-group">
                  <span className="form-label">Observações</span>
                  <p style={{ marginTop: 4, color: 'var(--color-text)' }}>{modalVer.observacoes}</p>
                </div>
              </>
            )}
            <Modal.Footer>
              <button className="btn" onClick={() => setModalVer(null)}>Fechar</button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ── Helpers ───────────────────────────────────
function formVazio() {
  return { nome: '', telefone: '', email: '', cidade: '', observacoes: '' }
}

function initials(nome) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

function DetailItem({ label, value, highlight }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className={`detail-value ${highlight ? 'detail-highlight' : ''}`}>{value}</span>
    </div>
  )
}