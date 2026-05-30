// =============================================
//   INFLAFEST — MetricCard Component
//   src/components/MetricCard.jsx
// =============================================

// ── Exemplo de uso ────────────────────────────
// <MetricCard
//   title="Receita do Mês"
//   value="R$4.820"
//   sub="+18% vs abril"
//   trend="up"
//   icon={<DollarSign size={18} />}
// />

export default function MetricCard({ title, value, sub, trend, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        {icon && (
          <div className="metric-card-icon">
            {icon}
          </div>
        )}
        <span className="metric-card-title">{title}</span>
      </div>

      <div className="metric-card-value">{value}</div>

      {sub && (
        <div className={`metric-card-sub ${trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : ''}`}>
          {trend === 'up'   && <span className="trend-arrow">↑ </span>}
          {trend === 'down' && <span className="trend-arrow">↓ </span>}
          {sub}
        </div>
      )}
    </div>
  )
}