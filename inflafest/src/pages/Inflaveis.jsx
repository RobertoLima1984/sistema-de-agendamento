// =============================================
//   INFLAFEST — Infláveis Page
//   src/pages/Inflaveis.jsx
// =============================================

import { useState } from 'react'
import { Plus, Trash2, Eye } from 'lucide-react'

import Modal from '../components/Modal'
import Badge from '../components/Badge'
import { inflaveis as inflaveisMock, formatCurrency } from '../data/mockData'

export default function Inflaveis() {
  const [inflaveis, setInflaveis] = useState(inflaveisMock)
  const [modalNovo, setModalNovo] = useState(false)
  const [modalVer, setModalVer]   = useState(null)
  const [form, setForm]           = useState(formVazio())
  const [filtro, setFiltro]       = useState('todos')

  const inflaveisFiltrados = inflaveis.filter(i =>
    filtro === 'todos' ? true : i.status === filtro
  )

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSalvar() {
    if (!form.nome || !form.precoDia) return alert('Nome e preço são obrigatórios.')
    const novo = {
      id: inflaveis.length + 1,
      ...form,
      precoDia: Number(form.precoDia),
      totalAlugueis: 0,
      emoji: form.emoji || '🎪',
    }
    setInflaveis(prev => [novo, ...prev])
    setForm(formVazio())
    setModalNovo(false)
  }

  function handleExcluir(id) {
    if (!confirm('Deseja excluir este inflável?')) return
    setInflaveis(prev => prev.filter(i => i.id !== id))
    setModalVer(null)
  }

  function handleStatusChange(id, novoStatus) {
    setInflaveis(prev =>
      prev.map(i => i.id === id ? { ...i, status: novoStatus } : i)
    )
    setModalVer(prev => prev ? { ...prev, status: novoStatus } : null)
  }

  const contadores = {
    todos:      inflaveis.length,
    disponivel: inflaveis.filter(i => i.status === 'disponivel').length,
    alugado:    inflaveis.filter(i => i.status === 'alugado').length,
    manutencao: inflaveis.filter(i => i.status === 'manutencao').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Infláveis</h2>
          <p>{inflaveis.length} itens cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalNovo(true)}>
          <Plus size={15} />
          Novo Inflável
        </button>
      </div>

      {/* Filtros */}
      <div className="filtro-tabs mb-16">
        {[
          { key: 'todos',      label: 'Todos'       },
          { key: 'disponivel', label: 'Disponíveis' },
          { key: 'alugado',    label: 'Alugados'    },
          { key: 'manutencao', label: 'Manutenção'  },
        ].map(f => (
          <button
            key={f.key}
            className={`filtro-tab ${filtro === f.key ? 'active' : ''}`}
            onClick={() => setFiltro(f.key)}
          >
            {f.label}
            <span className="filtro-count">{contadores[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      <div className="inflaveis-grid">
        {inflaveisFiltrados.map(inf => (
          <div key={inf.id} className="inflavel-card">
            <div className="inflavel-emoji">{inf.emoji}</div>
            <div className="inflavel-info">
              <div className="inflavel-nome">{inf.nome}</div>
              <div className="inflavel-preco">{formatCurrency(inf.precoDia)}<span>/dia</span></div>
              <div className="inflavel-detalhes">
                <span>📐 {inf.dimensoes}</span>
                <span>👶 {inf.idadeMinima}</span>
                <span>👥 {inf.capacidade}</span>
              </div>
              <div className="inflavel-footer">
                <Badge status={inf.status} />
                <div className="inflavel-acoes">
                  <button
                    className="btn btn-sm btn-icon"
                    title="Ver detalhes"
                    onClick={() => setModalVer(inf)}
                  >
                    <Eye size={13} />
                  </button>
                  <button
                    className="btn btn-sm btn-icon btn-danger"
                    title="Excluir"
                    onClick={() => handleExcluir(inf.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Card adicionar */}
        <div className="inflavel-card inflavel-card-add" onClick={() => setModalNovo(true)}>
          <Plus size={24} />
          <span>Adicionar inflável</span>
        </div>
      </div>

      {/* Modal Novo Inflável */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Inflável"
      >
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome do inflável *</label>
            <input
              className="form-control"
              name="nome"
              placeholder="Ex: Pula-Pula XL"
              value={form.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Emoji</label>
            <input
              className="form-control"
              name="emoji"
              placeholder="🎪"
              value={form.emoji}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Preço por dia (R$) *</label>
            <input
              className="form-control"
              type="number"
              name="precoDia"
              placeholder="0,00"
              value={form.precoDia}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" name="status" value={form.status} onChange={handleChange}>
              <option value="disponivel">Disponível</option>
              <option value="alugado">Alugado</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Dimensões</label>
            <input
              className="form-control"
              name="dimensoes"
              placeholder="Ex: 4m x 4m"
              value={form.dimensoes}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Capacidade</label>
            <input
              className="form-control"
              name="capacidade"
              placeholder="Ex: 10 crianças"
              value={form.capacidade}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Idade mínima</label>
            <input
              className="form-control"
              name="idadeMinima"
              placeholder="Ex: 3 anos"
              value={form.idadeMinima}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="descricao"
            placeholder="Descreva o inflável..."
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <Modal.Footer>
          <button className="btn" onClick={() => { setModalNovo(false); setForm(formVazio()) }}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSalvar}>
            Salvar Inflável
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Ver Inflável */}
      <Modal
        open={!!modalVer}
        onClose={() => setModalVer(null)}
        title="Detalhes do Inflável"
      >
        {modalVer && (
          <div>
            <div className="inflavel-detail-header">
              <div className="inflavel-detail-emoji">{modalVer.emoji}</div>
              <div>
                <div className="inflavel-detail-nome">{modalVer.nome}</div>
                <div className="inflavel-detail-preco">{formatCurrency(modalVer.precoDia)} / dia</div>
              </div>
            </div>
            <div className="divider" />
            <div className="detail-grid">
              <DetailItem label="Dimensões"     value={modalVer.dimensoes    || '—'} />
              <DetailItem label="Capacidade"    value={modalVer.capacidade   || '—'} />
              <DetailItem label="Idade mínima"  value={modalVer.idadeMinima  || '—'} />
              <DetailItem label="Total aluguéis" value={modalVer.totalAlugueis} />
            </div>
            {modalVer.descricao && (
              <>
                <div className="divider" />
                <div className="form-group">
                  <span className="form-label">Descrição</span>
                  <p style={{ marginTop: 4, color: 'var(--color-text)' }}>{modalVer.descricao}</p>
                </div>
              </>
            )}
            <div className="divider" />
            <div className="form-group">
              <label className="form-label">Alterar status</label>
              <select
                className="form-control"
                value={modalVer.status}
                onChange={e => handleStatusChange(modalVer.id, e.target.value)}
              >
                <option value="disponivel">Disponível</option>
                <option value="alugado">Alugado</option>
                <option value="manutencao">Manutenção</option>
              </select>
            </div>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={() => handleExcluir(modalVer.id)}>
                <Trash2 size={13} /> Excluir
              </button>
              <button className="btn" onClick={() => setModalVer(null)}>Fechar</button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  )
}

function formVazio() {
  return {
    nome: '', emoji: '', precoDia: '', status: 'disponivel',
    dimensoes: '', capacidade: '', idadeMinima: '', descricao: '',
  }
}

function DetailItem({ label, value, highlight }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className={`detail-value ${highlight ? 'detail-highlight' : ''}`}>{value}</span>
    </div>
  )
}
