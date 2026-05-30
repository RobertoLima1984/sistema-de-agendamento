// =============================================
//   INFLAFEST — Fluxo de Caixa Page
//   src/pages/FluxoCaixa.jsx
// =============================================

import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'

import Modal from '../components/Modal'
import Badge from '../components/Badge'
import {
  lancamentos as lancamentosIniciais,
  dadosMensais,
  formatCurrency,
  formatDate,
} from '../data/mockData'

const CATEGORIAS = [
  'Aluguel de inflável',
  'Manutenção',
  'Combustível',
  'Equipamentos',
  'Taxas',
  'Outros',
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-label">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="chart-tooltip-item" style={{ color: p.color }}>
            {p.name}: {formatCurrency(p.value)}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function FluxoCaixa() {
  const [lancamentos, setLancamentos] = useState(lancamentosIniciais)
  const [modalNovo, setModalNovo]     = useState(false)
  const [filtroTipo, setFiltroTipo]   = useState('todos')
  const [form, setForm]               = useState(formVazio())

  // ── Cálculos ──────────────────────────────
  const totalEntradas = lancamentos
    .filter(l => l.tipo === 'entrada')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalSaidas = lancamentos
    .filter(l => l.tipo === 'saida')
    .reduce((acc, l) => acc + l.valor, 0)

  const saldo = totalEntradas - totalSaidas

  // ── Filtro ────────────────────────────────
  const lancamentosFiltrados = lancamentos
    .filter(l => filtroTipo === 'todos' ? true : l.tipo === filtroTipo)
    .sort((a, b) => new Date(b.data) - new Date(a.data))

  // ── Handlers ──────────────────────────────
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSalvar() {
    if (!form.descricao || !form.valor || !form.data) {
      return alert('Descrição, valor e data são obrigatórios.')
    }
    const novo = {
      id: lancamentos.length + 1,
      tipo:      form.tipo,
      descricao: form.descricao,
      categoria: form.categoria,
      valor:     Number(form.valor),
      data:      form.data,
    }
    setLancamentos(prev => [novo, ...prev])
    setForm(formVazio())
    setModalNovo(false)
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Fluxo de Caixa</h2>
          <p>Controle de entradas e saídas — maio 2026</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalNovo(true)}>
          <Plus size={15} />
          Novo Lançamento
        </button>
      </div>

      {/* Resumo */}
      <div className="grid-3 mb-24">
        <div className="fc-summary-card fc-receita">
          <div className="fc-summary-icon">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="fc-summary-label">Total Entradas</div>
            <div className="fc-summary-valor">{formatCurrency(totalEntradas)}</div>
          </div>
        </div>
        <div className="fc-summary-card fc-despesa">
          <div className="fc-summary-icon">
            <TrendingDown size={18} />
          </div>
          <div>
            <div className="fc-summary-label">Total Saídas</div>
            <div className="fc-summary-valor">{formatCurrency(totalSaidas)}</div>
          </div>
        </div>
        <div className="fc-summary-card fc-saldo">
          <div className="fc-summary-icon">
            <Wallet size={18} />
          </div>
          <div>
            <div className="fc-summary-label">Saldo do Mês</div>
            <div className="fc-summary-valor">{formatCurrency(saldo)}</div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="card mb-24">
        <div className="card-title">
          <TrendingUp size={15} />
          Receitas vs Despesas (últimos 6 meses)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dadosMensais} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `R$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receita" name="Receita" fill="#1D9E75" radius={[4,4,0,0]} />
            <Bar dataKey="despesa" name="Despesa" fill="#FCA5A5" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="chart-legenda">
          <span><span className="legend-dot" style={{ background: '#1D9E75' }} /> Receitas</span>
          <span><span className="legend-dot" style={{ background: '#FCA5A5' }} /> Despesas</span>
        </div>
      </div>

      {/* Tabela de lançamentos */}
      <div className="card">
        <div className="flex-between mb-16">
          <div className="card-title" style={{ margin: 0 }}>
            <Wallet size={15} />
            Lançamentos
          </div>
          <div className="filtro-tabs">
            {[
              { key: 'todos',   label: 'Todos'    },
              { key: 'entrada', label: 'Entradas' },
              { key: 'saida',   label: 'Saídas'   },
            ].map(f => (
              <button
                key={f.key}
                className={`filtro-tab ${filtroTipo === f.key ? 'active' : ''}`}
                onClick={() => setFiltroTipo(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th style={{ textAlign: 'right' }}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {lancamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)' }}>
                    Nenhum lançamento encontrado.
                  </td>
                </tr>
              ) : (
                lancamentosFiltrados.map(l => (
                  <tr key={l.id}>
                    <td style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {formatDate(l.data)}
                    </td>
                    <td className="td-name">{l.descricao}</td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{l.categoria}</td>
                    <td><Badge status={l.tipo} /></td>
                    <td style={{
                      textAlign: 'right',
                      fontWeight: 700,
                      color: l.tipo === 'entrada'
                        ? 'var(--color-primary)'
                        : 'var(--color-danger)',
                    }}>
                      {l.tipo === 'entrada' ? '+' : '-'}{formatCurrency(l.valor)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Lançamento */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Lançamento"
      >
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tipo *</label>
            <select className="form-control" name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="entrada">Entrada (Receita)</option>
              <option value="saida">Saída (Despesa)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Valor (R$) *</label>
            <input
              className="form-control"
              type="number"
              name="valor"
              placeholder="0,00"
              value={form.valor}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data *</label>
            <input
              className="form-control"
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select className="form-control" name="categoria" value={form.categoria} onChange={handleChange}>
              {CATEGORIAS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Descrição *</label>
          <input
            className="form-control"
            name="descricao"
            placeholder="Ex: Ana Paula — Castelo Encantado"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <Modal.Footer>
          <button className="btn" onClick={() => { setModalNovo(false); setForm(formVazio()) }}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSalvar}>
            Registrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function formVazio() {
  return {
    tipo: 'entrada',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: 'Aluguel de inflável',
    descricao: '',
  }
}
