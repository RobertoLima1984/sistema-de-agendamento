// =============================================
//   INFLAFEST — Badge Component
//   src/components/Badge.jsx
// =============================================

import { getStatusInfo } from '../data/mockData'

// ── Uso básico com status automático ──────────
// <Badge status="confirmado" />
// <Badge status="pendente" />
// <Badge status="disponivel" />

// ── Uso manual com label e className ──────────
// <Badge label="Personalizado" className="badge-blue" />

export default function Badge({ status, label, className }) {
  // Se passar status, usa o helper para pegar label + classe
  const info = status ? getStatusInfo(status) : null

  const badgeClass = className || info?.className || 'badge-gray'
  const badgeLabel = label     || info?.label     || status || ''

  return (
    <span className={`badge ${badgeClass}`}>
      {badgeLabel}
    </span>
  )
}