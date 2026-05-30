// =============================================
//   INFLAFEST — Dashboard Page
//   src/pages/Dashboard.jsx
// =============================================

// import { useState } from 'react'
import {
  DollarSign,
  CalendarDays,
  Users,
  TrendingUp,
  Package,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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
} from '../data/mockData'

// ── Tooltip personalizado dos gráficos ────────
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
  // ── Cálculos das métricas ──────────────────
  const totalReceita = lancamentos
    .filter(l => l.tipo === 'entrada')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalAgendamentos = agendamentos.length

  const totalClientes = 47 // simulado

  const ocupacao = Math.round(
    (inflaveis.filter(i => i.status === 'alugado').length / inflaveis.length) * 100
  )

  // ── Próximos agendamentos (ordenados por data) ──
  const proximos = [...agendamentos]
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4)

  // ── Infláveis mais alugados ────────────────
  const maisAlugados = [...inflaveis]
    .sort((a, b) => b.totalAlugueis - a.totalAlugueis)
    .slice(0, 4)

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Dashboard</h2>
          <p>Resumo geral — maio 2026</p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid-4 mb-24">
        <MetricCard
          title="Receita do Mês"
          value={formatCurrency(totalReceita)}
          sub="+18% vs abril"
          trend="up"
          icon={<DollarSign size={16} />}
        />
        <MetricCard
          title="Agendamentos"
          value={totalAgendamentos}
          sub="+5 vs abril"
          trend="up"
          icon={<CalendarDays size={16} />}
        />
        <MetricCard
          title="Clientes Ativos"
          value={totalClientes}
          sub="8 novos este mês"
          icon={<Users size={16} />}
        />
        <MetricCard
          title="Taxa de Ocupação"
          value={`${ocupacao}%`}
          sub="Alta demanda"
          trend="up"
          icon={<TrendingUp size={16} />}
        />
      </div>

      {/* Gráficos */}
      <div className="grid-2 mb-24">

        {/* Receita vs Despesa */}
        <div className="card">
          <div className="card-title">
            <TrendingUp size={15} />
            Receitas vs Despesas (6 meses)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dadosMensais} barGap={4}>
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
              <Bar dataKey="receita" name="Receita" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesa" name="Despesa" fill="#FECACA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita Semanal */}
        <div className="card">
          <div className="card-title">
            <BarChart2Icon />
            Receita Semanal
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dadosSemanais}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="dia"
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `R$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="valor"
                name="Receita"
                stroke="#1D9E75"
                strokeWidth={2.5}
                dot={{ fill: '#1D9E75', r: 4 }}
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
            {proximos.map(ag => (
              <div key={ag.id} className="agenda-item">
                <div className="agenda-dot" style={{ background: dotColor(ag.status) }} />
                <div className="agenda-info">
                  <div className="agenda-name">{ag.clienteNome}</div>
                  <div className="agenda-detail">
                    {ag.inflavelNome} · {formatDate(ag.data)}
                  </div>
                </div>
                <div className="agenda-right">
                  <span className="agenda-valor">{formatCurrency(ag.valor)}</span>
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
                    <span style={{ marginRight: 6 }}>{inf.emoji}</span>
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

// ── Helpers internos ──────────────────────────
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

