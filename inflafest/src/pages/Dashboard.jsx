// =============================================
//   ESPAÇO KIDS LOCAÇÕES — Dashboard Page
//   src/pages/Dashboard.jsx
// =============================================

import {
  DollarSign,
  CalendarDays,
  Users,
  TrendingUp,
  Package,
} from 'lucide-react'
import {
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
  LineChart, Line,
  CartesianGrid,
} from 'recharts'

import MetricCard from '../components/MetricCard'
import Badge from '../components/Badge'
import {
  agendamentos,
  inflaveis,
  lancamentos,
  dadosMensais,
  dadosSemanais,
  formatCurrency,
  formatDate,
  getMesLabel,
} from '../data/mockData'
import { useState } from 'react'

const MESES_OPCOES = [
  { value: 'todos', label: 'Ano inteiro' },
  { value: '0',  label: 'Janeiro'   },
  { value: '1',  label: 'Fevereiro' },
  { value: '2',  label: 'Março'     },
  { value: '3',  label: 'Abril'     },
  { value: '4',  label: 'Maio'      },
  { value: '5',  label: 'Junho'     },
  { value: '6',  label: 'Julho'     },
  { value: '7',  label: 'Agosto'    },
  { value: '8',  label: 'Setembro'  },
  { value: '9',  label: 'Outubro'   },
  { value: '10', label: 'Novembro'  },
  { value: '11', label: 'Dezembro'  },
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

export default function Dashboard() {
  const [mesFiltro, setMesFiltro] = useState('todos')

  // ── Filtra lançamentos pelo mês selecionado ──
  const lancamentosFiltrados = lancamentos.filter(l => {
    if (mesFiltro === 'todos') return true
    const mes = new Date(l.data + 'T00:00:00').getMonth()
    return mes === Number(mesFiltro)
  })

  // ── Filtra agendamentos pelo mês selecionado ──
  const agendamentosFiltrados = agendamentos.filter(a => {
    if (mesFiltro === 'todos') return true
    const mes = new Date(a.data + 'T00:00:00').getMonth()
    return mes === Number(mesFiltro)
  })

  // ── Métricas ──────────────────────────────────
  const totalReceita = lancamentosFiltrados
    .filter(l => l.tipo === 'entrada')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalDespesa = lancamentosFiltrados
    .filter(l => l.tipo === 'saida')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalAgendamentos = agendamentosFiltrados.length
  const totalClientes = 47
  const ocupacao = Math.round(
    (inflaveis.filter(i => i.status === 'alugado').length / inflaveis.length) * 100
  )

  // ── Próximos 4 agendamentos (ordenados) ──────
  const proximos = [...agendamentos]
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4)

  // ── Infláveis mais alugados ──────────────────
  const maisAlugados = [...inflaveis]
    .sort((a, b) => b.totalAlugueis - a.totalAlugueis)
    .slice(0, 4)

  // ── Label do período selecionado ─────────────
  const periodoLabel = mesFiltro === 'todos'
    ? 'Ano 2026'
    : getMesLabel(Number(mesFiltro)) + ' 2026'

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Dashboard</h2>
          <p>Resumo geral — {periodoLabel}</p>
        </div>
      </div>

      {/* Filtro de mês */}
      <div className="dashboard-filter mb-24">
        <label>Filtrar por período:</label>
        <select
          value={mesFiltro}
          onChange={e => setMesFiltro(e.target.value)}
        >
          {MESES_OPCOES.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        {mesFiltro !== 'todos' && (
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setMesFiltro('todos')}
          >
            Limpar filtro
          </button>
        )}
      </div>

      {/* Métricas */}
      <div className="grid-4 mb-28">
        <MetricCard
          title="Receita"
          value={formatCurrency(totalReceita)}
          sub={mesFiltro === 'todos' ? 'Ano inteiro' : getMesLabel(Number(mesFiltro))}
          trend="up"
          icon={<DollarSign size={16} />}
        />
        <MetricCard
          title="Despesas"
          value={formatCurrency(totalDespesa)}
          sub={mesFiltro === 'todos' ? 'Ano inteiro' : getMesLabel(Number(mesFiltro))}
          trend="down"
          icon={<TrendingUp size={16} />}
        />
        <MetricCard
          title="Agendamentos"
          value={totalAgendamentos}
          sub={mesFiltro === 'todos' ? 'Todos os meses' : getMesLabel(Number(mesFiltro))}
          icon={<CalendarDays size={16} />}
        />
        <MetricCard
          title="Clientes Ativos"
          value={totalClientes}
          sub="8 novos este mês"
          icon={<Users size={16} />}
        />
      </div>

      {/* Gráficos */}
      <div className="grid-2 mb-28">

        {/* Receita vs Despesa — 12 meses */}
        <div className="card">
          <div className="card-title">
            <TrendingUp size={15} />
            Receitas vs Despesas — 12 meses
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dadosMensais} barGap={4} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`}
                width={42}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="receita" name="Receita" fill="#1D9E75" radius={[4,4,0,0]} />
              <Bar dataKey="despesa" name="Despesa" fill="#FCA5A5" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-legenda">
            <span><span className="legend-dot" style={{ background: '#1D9E75' }} />Receitas</span>
            <span><span className="legend-dot" style={{ background: '#FCA5A5' }} />Despesas</span>
          </div>
        </div>

        {/* Receita por semana */}
        <div className="card">
          <div className="card-title">
            <BarChart2Icon />
            Receita por Semana — 2026
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dadosSemanais}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="semana"
                tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `R$${(v / 1000).toFixed(1)}k`}
                width={46}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="valor"
                name="Receita"
                stroke="#1D9E75"
                strokeWidth={2.5}
                dot={{ fill: '#1D9E75', r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximos agendamentos + infláveis */}
      <div className="grid-2">

        {/* Próximos agendamentos */}
        <div className="card">
          <div className="card-title">
            <CalendarDays size={15} />
            Próximos Agendamentos
          </div>
          <div className="agenda-list">
            {proximos.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '24px 0' }}>
                Nenhum agendamento encontrado.
              </p>
            ) : proximos.map(ag => (
              <div key={ag.id} className="agenda-item">
                <div className="agenda-dot" style={{ background: dotColor(ag.status) }} />
                <div className="agenda-info">
                  <div className="agenda-name">{ag.clienteNome}</div>
                  <div className="agenda-detail">
                    {ag.inflaveis?.map(i => i.nome).join(', ')} · {formatDate(ag.data)}
                  </div>
                </div>
                <div className="agenda-right">
                  <span className="agenda-valor">{formatCurrency(ag.valorTotal)}</span>
                  <Badge status={ag.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infláveis mais alugados */}
        <div className="card">
          <div className="card-title">
            <Package size={15} />
            Infláveis Mais Alugados
          </div>
          <table>
            <thead>
              <tr>
                <th>Inflável</th>
                <th>Aluguéis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {maisAlugados.map(inf => (
                <tr key={inf.id}>
                  <td>
                    <span style={{ marginRight: 7 }}>{inf.emoji}</span>
                    <span className="td-name">{inf.nome}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{inf.totalAlugueis}</td>
                  <td><Badge status={inf.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────
function dotColor(status) {
  const map = {
    confirmado: '#1D9E75',
    pendente:   '#EF9F27',
    novo:       '#378ADD',
    cancelado:  '#E24B4A',
  }
  return map[status] || '#9CA3AF'
}

function BarChart2Icon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ color: 'var(--color-primary)' }}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4"  />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  )
}