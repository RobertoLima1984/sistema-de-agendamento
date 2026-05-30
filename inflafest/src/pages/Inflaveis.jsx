// =============================================
//   ESPAÇO KIDS LOCAÇÕES — Infláveis Page
//   src/pages/Inflaveis.jsx
// =============================================

import { useState, useRef, useEffect } from 'react'
import { Plus, Trash2, Eye } from 'lucide-react'

import Modal from '../components/Modal'
import Badge from '../components/Badge'
import { inflaveis as inflaveisMock, formatCurrency } from '../data/mockData'

// ── Lista de emojis disponíveis ───────────────
const EMOJIS = [
  '🎪','🏰','🌊','🎉','🐉','🔵','🎠','🎡','🎢','🎃',
  '🦁','🐸','🦄','🐻','🐼','🦊','🐯','🐨','🦋','🌈',
  '⭐','🌟','💫','🎈','🎁','🎀','🎊','🏆','🚀','🌺',
  '🍭','🍦','🧁','🍩','🎂','🏄','🤸','🎯','🎲','🎮',
]

export default function Inflaveis() {
  const [inflaveis, setInflaveis]     = useState(inflaveisMock)
  const [modalNovo, setModalNovo]     = useState(false)
  const [modalVer, setModalVer]       = useState(null)
  const [form, setForm]               = useState(formVazio())
  const [filtro, setFiltro]           = useState('todos')
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const emojiRef = useRef(null)

  // Fecha emoji picker ao clicar fora
  useEffect(() => {
    function handleClick(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ── Filtro ────────────────────────────────
  const inflaveisFiltrados = inflaveis.filter(i =>
    filtro === 'todos' ? true : i.status === filtro
  )

  const contadores = {
    todos:      inflaveis.length,
    disponivel: inflaveis.filter(i => i.status === 'disponivel').length,
    alugado:    inflaveis.filter(i => i.status === 'alugado').length,
    manutencao: inflaveis.filter(i => i.status === 'manutencao').length,
  }

  // ── Handlers ──────────────────────────────
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Formata as dimensões automaticamente
  function handleDimensoes(e) {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      // Monta a string formatada: "ALT Xm COM Ym LAR Zm"
      const alt = updated.dimAlt ? `ALT ${updated.dimAlt}m` : ''
      const com = updated.dimCom ? `COM ${updated.dimCom}m` : ''
      const lar = updated.dimLar ? `LAR ${updated.dimLar}m` : ''
      updated.dimensoes = [alt, com, lar].filter(Boolean).join(' ')
      return updated
    })
  }

  function handleSalvar() {
    if (!form.nome.trim())    return alert('Nome é obrigatório.')
    if (!form.precoDia)       return alert('Preço é obrigatório.')

    const novo = {
      id: inflaveis.length + 1,
      nome:          form.nome,
      emoji:         form.emoji || '🎪',
      precoDia:      Number(form.precoDia),
      dimensoes:     form.dimensoes,
      idadeMinima:   form.idadeMinima,
      capacidade:    form.capacidade,
      status:        form.status,
      descricao:     form.descricao,
      totalAlugueis: 0,
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
          { key: 'todos',      label: 'Todos'        },
          { key: 'disponivel', label: 'Disponíveis'  },
          { key: 'alugado',    label: 'Alugados'     },
          { key: 'manutencao', label: 'Manutenção'   },
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
              <div className="inflavel-preco">
                {formatCurrency(inf.precoDia)}<span>/dia</span>
              </div>
              <div className="inflavel-detalhes">
                {inf.dimensoes && <span>📐 {inf.dimensoes}</span>}
                {inf.idadeMinima && <span>👶 {inf.idadeMinima}</span>}
                {inf.capacidade && <span>👥 {inf.capacidade}</span>}
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
        <div
          className="inflavel-card inflavel-card-add"
          onClick={() => setModalNovo(true)}
        >
          <Plus size={24} />
          <span>Adicionar inflável</span>
        </div>
      </div>

      {/* ── Modal Novo Inflável ── */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Inflável"
        width="520px"
      >
        {/* Emoji picker + Nome */}
        <div className="form-row" style={{ alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: '0 0 auto' }}>
            <label className="form-label">Emoji</label>
            <div className="emoji-picker-wrap" ref={emojiRef}>
              <button
                className="emoji-picker-btn"
                onClick={() => setEmojiPickerOpen(o => !o)}
                type="button"
              >
                {form.emoji}
                <span>Trocar ▾</span>
              </button>
              {emojiPickerOpen && (
                <div className="emoji-grid">
                  {EMOJIS.map(e => (
                    <div
                      key={e}
                      className="emoji-option"
                      onClick={() => {
                        setForm(prev => ({ ...prev, emoji: e }))
                        setEmojiPickerOpen(false)
                      }}
                    >
                      {e}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Nome do inflável *</label>
            <input
              className="form-control"
              name="nome"
              placeholder="Ex: Pula-Pula XL"
              value={form.nome}
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

        {/* Dimensões com campos separados */}
        <div className="form-group">
          <label className="form-label">Dimensões</label>
          <div className="form-row-3" style={{ marginBottom: 6 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
                ALT (altura)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  className="form-control"
                  name="dimAlt"
                  placeholder="4,20"
                  value={form.dimAlt}
                  onChange={handleDimensoes}
                />
                <span style={{ color: 'var(--color-text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>m</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
                COM (comprimento)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  className="form-control"
                  name="dimCom"
                  placeholder="5,00"
                  value={form.dimCom}
                  onChange={handleDimensoes}
                />
                <span style={{ color: 'var(--color-text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>m</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
                LAR (largura)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  className="form-control"
                  name="dimLar"
                  placeholder="3,00"
                  value={form.dimLar}
                  onChange={handleDimensoes}
                />
                <span style={{ color: 'var(--color-text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>m</span>
              </div>
            </div>
          </div>
          {/* Preview das dimensões formatadas */}
          {form.dimensoes && (
            <div style={{
              padding: '7px 12px',
              background: 'var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12, fontWeight: 700,
              color: 'var(--color-primary-dark)',
            }}>
              📐 {form.dimensoes}
            </div>
          )}
        </div>

        <div className="form-row">
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

      {/* ── Modal Ver Inflável ── */}
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
                <div className="inflavel-detail-preco">
                  {formatCurrency(modalVer.precoDia)} / dia
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="detail-grid">
              <DetailItem label="Dimensões"      value={modalVer.dimensoes    || '—'} />
              <DetailItem label="Capacidade"     value={modalVer.capacidade   || '—'} />
              <DetailItem label="Idade mínima"   value={modalVer.idadeMinima  || '—'} />
              <DetailItem label="Total aluguéis" value={modalVer.totalAlugueis} />
            </div>

            {modalVer.descricao && (
              <>
                <div className="divider" />
                <div className="form-group">
                  <span className="form-label">Descrição</span>
                  <p style={{ marginTop: 4, color: 'var(--color-text)' }}>
                    {modalVer.descricao}
                  </p>
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

// ── Helpers ───────────────────────────────────
function formVazio() {
  return {
    nome: '', emoji: '🎪', precoDia: '', status: 'disponivel',
    dimAlt: '', dimCom: '', dimLar: '', dimensoes: '',
    capacidade: '', idadeMinima: '', descricao: '',
  }
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}