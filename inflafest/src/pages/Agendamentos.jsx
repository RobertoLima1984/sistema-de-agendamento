// =============================================
//   ESPAÇO KIDS LOCAÇÕES — Agendamentos Page
//   src/pages/Agendamentos.jsx
// =============================================

import { useState } from 'react'
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react'

import Modal from '../components/Modal'
import Badge from '../components/Badge'
import {
  agendamentos as agendamentosIniciais,
  clientes,
  inflaveis,
  formatCurrency,
  formatDate,
} from '../data/mockData'

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]
const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

// Gera lista de horas: 06:00 até 23:00
const HORAS = Array.from({ length: 18 }, (_, i) => {
  const h = String(i + 6).padStart(2, '0')
  return h + ':00'
})

// Gera lista de minutos
const MINUTOS = ['00', '15', '30', '45']

export default function Agendamentos() {
  const hoje = new Date()

  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais)
  const [mesAtual, setMesAtual]         = useState(hoje.getMonth())
  const [anoAtual, setAnoAtual]         = useState(hoje.getFullYear())
  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [modalNovo, setModalNovo]       = useState(false)
  const [modalVer, setModalVer]         = useState(null)
  const [form, setForm]                 = useState(formVazio())

  // ── Navegação de meses ────────────────────
  function mesAnterior() {
    if (mesAtual === 0) { setMesAtual(11); setAnoAtual(a => a - 1) }
    else setMesAtual(m => m - 1)
  }
  function proximoMes() {
    if (mesAtual === 11) { setMesAtual(0); setAnoAtual(a => a + 1) }
    else setMesAtual(m => m + 1)
  }

  // ── Calendário ────────────────────────────
  function getDiasCalendario() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay()
    const totalDias   = new Date(anoAtual, mesAtual + 1, 0).getDate()
    const diasMesAnt  = new Date(anoAtual, mesAtual, 0).getDate()
    const dias = []
    for (let i = primeiroDia - 1; i >= 0; i--)
      dias.push({ dia: diasMesAnt - i, mesAtual: false })
    for (let i = 1; i <= totalDias; i++)
      dias.push({ dia: i, mesAtual: true })
    const restante = 42 - dias.length
    for (let i = 1; i <= restante; i++)
      dias.push({ dia: i, mesAtual: false })
    return dias
  }

  function dataStr(dia) {
    return `${anoAtual}-${String(mesAtual + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`
  }

  function agendamentosDoDia(dia) {
    return agendamentos.filter(a => a.data === dataStr(dia))
  }

  function temAgendamento(dia) {
    return agendamentosDoDia(dia).length > 0
  }

  function eHoje(dia) {
    return dia === hoje.getDate() &&
      mesAtual === hoje.getMonth() &&
      anoAtual === hoje.getFullYear()
  }

  const agendamentosDoMes = agendamentos
    .filter(a => {
      const [ano, mes] = a.data.split('-').map(Number)
      return mes - 1 === mesAtual && ano === anoAtual
    })
    .sort((a, b) => new Date(a.data) - new Date(b.data))

  const agendamentosExibidos = diaSelecionado
    ? agendamentosDoDia(diaSelecionado)
    : agendamentosDoMes

  // ── Handlers do formulário ────────────────
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Adicionar linha de inflável
  function addInflavel() {
    setForm(prev => ({
      ...prev,
      inflaveis: [...prev.inflaveis, { inflavelId: '', valor: '' }],
    }))
  }

  // Remover linha de inflável
  function removeInflavel(idx) {
    setForm(prev => ({
      ...prev,
      inflaveis: prev.inflaveis.filter((_, i) => i !== idx),
    }))
  }

  // Atualizar campo de uma linha de inflável
  function handleInflavelChange(idx, field, value) {
    setForm(prev => {
      const lista = [...prev.inflaveis]
      lista[idx] = { ...lista[idx], [field]: value }
      // Auto-preenche o valor com o preço do inflável selecionado
      if (field === 'inflavelId') {
        const inf = inflaveis.find(i => i.id === Number(value))
        if (inf) lista[idx].valor = String(inf.precoDia)
      }
      return { ...prev, inflaveis: lista }
    })
  }

  // Calcula total automaticamente
  const totalCalculado = form.inflaveis.reduce((acc, i) => acc + (Number(i.valor) || 0), 0)
  const restanteCalculado = totalCalculado - (Number(form.valorEntrada) || 0)

  function handleSalvar() {
    if (!form.clienteId)       return alert('Selecione um cliente.')
    if (!form.data)            return alert('Selecione a data.')
    if (form.inflaveis.length === 0 || !form.inflaveis[0].inflavelId)
      return alert('Adicione pelo menos um inflável.')

    const cliente = clientes.find(c => c.id === Number(form.clienteId))
    const listaInflaveis = form.inflaveis.map(item => {
      const inf = inflaveis.find(i => i.id === Number(item.inflavelId))
      return { id: inf?.id, nome: inf?.nome || '', valor: Number(item.valor) || 0 }
    })

    const novo = {
      id: agendamentos.length + 1,
      clienteId:      Number(form.clienteId),
      clienteNome:    cliente?.nome || '',
      inflaveis:      listaInflaveis,
      data:           form.data,
      horaInicio:     `${form.horaInicioH}:${form.horaInicioM}`,
      horaFim:        `${form.horaFimH}:${form.horaFimM}`,
      endereco:       form.endereco,
      valorTotal:     totalCalculado,
      valorEntrada:   Number(form.valorEntrada) || 0,
      valorRestante:  restanteCalculado,
      formaPagamento: form.formaPagamento,
      parcelas:       Number(form.parcelas) || 1,
      status:         'novo',
      observacoes:    form.observacoes,
    }

    setAgendamentos(prev => [novo, ...prev])
    setForm(formVazio())
    setModalNovo(false)
  }

  function handleExcluir(id) {
    if (!confirm('Deseja excluir este agendamento?')) return
    setAgendamentos(prev => prev.filter(a => a.id !== id))
    setModalVer(null)
  }

  function handleStatusChange(id, novoStatus) {
    setAgendamentos(prev =>
      prev.map(a => a.id === id ? { ...a, status: novoStatus } : a)
    )
    setModalVer(prev => prev ? { ...prev, status: novoStatus } : null)
  }

  const dias = getDiasCalendario()

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Agendamentos</h2>
          <p>{agendamentosDoMes.length} agendamentos em {MESES[mesAtual]} {anoAtual}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalNovo(true)}>
          <Plus size={15} />
          Novo Agendamento
        </button>
      </div>

      <div className="agenda-layout">

        {/* ── Calendário ── */}
        <div className="card cal-card">
          <div className="cal-nav">
            <button className="btn btn-icon btn-sm" onClick={mesAnterior}>
              <ChevronLeft size={15} />
            </button>
            <span className="cal-mes-titulo">{MESES[mesAtual]} {anoAtual}</span>
            <button className="btn btn-icon btn-sm" onClick={proximoMes}>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="cal-grid">
            {DIAS_SEMANA.map(d => (
              <div key={d} className="cal-head">{d}</div>
            ))}
            {dias.map((item, idx) => (
              <div
                key={idx}
                className={[
                  'cal-day',
                  !item.mesAtual ? 'cal-other' : '',
                  item.mesAtual && eHoje(item.dia) ? 'cal-hoje' : '',
                  item.mesAtual && diaSelecionado === item.dia ? 'cal-selecionado' : '',
                ].join(' ')}
                onClick={() => {
                  if (!item.mesAtual) return
                  setDiaSelecionado(prev => prev === item.dia ? null : item.dia)
                }}
              >
                <span className="cal-dia-num">{item.dia}</span>
                {item.mesAtual && temAgendamento(item.dia) && (
                  <span className="cal-dot" />
                )}
              </div>
            ))}
          </div>

          <div className="cal-legenda">
            <span className="cal-legenda-item">
              <span className="cal-dot-sm cal-dot-hoje" /> Hoje
            </span>
            <span className="cal-legenda-item">
              <span className="cal-dot-sm" /> Agendado
            </span>
          </div>
        </div>

        {/* ── Lista ── */}
        <div className="card" style={{ flex: 1 }}>
          <div className="card-title">
            <CalendarDays size={15} />
            {diaSelecionado
              ? `${String(diaSelecionado).padStart(2,'0')}/${String(mesAtual+1).padStart(2,'0')} — ${agendamentosExibidos.length} agendamento(s)`
              : `${MESES[mesAtual]} ${anoAtual}`
            }
            {diaSelecionado && (
              <button
                className="btn btn-sm btn-ghost"
                style={{ marginLeft: 'auto' }}
                onClick={() => setDiaSelecionado(null)}
              >
                Ver todos
              </button>
            )}
          </div>

          {agendamentosExibidos.length === 0 ? (
            <div className="empty-state">
              <CalendarDays size={32} />
              <p>Nenhum agendamento {diaSelecionado ? 'neste dia' : 'neste mês'}.</p>
            </div>
          ) : (
            <div className="agenda-list">
              {agendamentosExibidos.map(ag => (
                <div
                  key={ag.id}
                  className="agenda-item agenda-item-clicavel"
                  onClick={() => setModalVer(ag)}
                >
                  <div className="agenda-dot" style={{ background: dotColor(ag.status) }} />
                  <div className="agenda-info">
                    <div className="agenda-name">{ag.clienteNome}</div>
                    <div className="agenda-detail">
                      {ag.inflaveis?.map(i => i.nome).join(' + ')} · {formatDate(ag.data)} · {ag.horaInicio}–{ag.horaFim}
                    </div>
                  </div>
                  <div className="agenda-right">
                    <span className="agenda-valor">{formatCurrency(ag.valorTotal)}</span>
                    <Badge status={ag.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal Novo Agendamento ── */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Agendamento"
        width="580px"
      >
        {/* Cliente */}
        <div className="form-group">
          <label className="form-label">Cliente *</label>
          <select className="form-control" name="clienteId" value={form.clienteId} onChange={handleChange}>
            <option value="">Selecione o cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome} — {c.telefone}</option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data do evento *</label>
            <input
              className="form-control"
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Endereço de entrega</label>
            <input
              className="form-control"
              name="endereco"
              placeholder="Rua, número, bairro, cidade"
              value={form.endereco}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Horários com seletor */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Hora início</label>
            <div className="time-select">
              <select
                value={form.horaInicioH}
                onChange={e => setForm(p => ({ ...p, horaInicioH: e.target.value }))}
              >
                {HORAS.map(h => <option key={h} value={h.split(':')[0]}>{h.split(':')[0]}</option>)}
              </select>
              <span className="time-select-sep">:</span>
              <select
                value={form.horaInicioM}
                onChange={e => setForm(p => ({ ...p, horaInicioM: e.target.value }))}
              >
                {MINUTOS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Hora fim</label>
            <div className="time-select">
              <select
                value={form.horaFimH}
                onChange={e => setForm(p => ({ ...p, horaFimH: e.target.value }))}
              >
                {HORAS.map(h => <option key={h} value={h.split(':')[0]}>{h.split(':')[0]}</option>)}
              </select>
              <span className="time-select-sep">:</span>
              <select
                value={form.horaFimM}
                onChange={e => setForm(p => ({ ...p, horaFimM: e.target.value }))}
              >
                {MINUTOS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Infláveis — múltiplos */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label className="form-label" style={{ margin: 0 }}>Infláveis *</label>
            <button className="btn btn-sm btn-primary" onClick={addInflavel}>
              <Plus size={12} /> Adicionar inflável
            </button>
          </div>
          <div className="inflaveis-agendamento">
            {form.inflaveis.map((item, idx) => (
              <div key={idx} className="inflavel-agend-item">
                <select
                  className="form-control"
                  value={item.inflavelId}
                  onChange={e => handleInflavelChange(idx, 'inflavelId', e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">Selecione o inflável</option>
                  {inflaveis.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.emoji} {i.nome} — {formatCurrency(i.precoDia)}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Valor R$"
                  value={item.valor}
                  onChange={e => handleInflavelChange(idx, 'valor', e.target.value)}
                  style={{ width: 120 }}
                />
                {form.inflaveis.length > 1 && (
                  <button
                    className="btn btn-icon btn-danger btn-sm"
                    onClick={() => removeInflavel(idx)}
                    title="Remover"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Total calculado */}
          {totalCalculado > 0 && (
            <div style={{
              marginTop: 8, padding: '8px 12px',
              background: 'var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13, fontWeight: 700,
              color: 'var(--color-primary-dark)',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>Total dos infláveis:</span>
              <span>{formatCurrency(totalCalculado)}</span>
            </div>
          )}
        </div>

        {/* Pagamento */}
        <div className="divider" />
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>
          💳 Informações de Pagamento
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Entrada / Sinal (R$)</label>
            <input
              className="form-control"
              type="number"
              name="valorEntrada"
              placeholder="0,00"
              value={form.valorEntrada}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Restante a pagar</label>
            <input
              className="form-control"
              type="number"
              value={restanteCalculado >= 0 ? restanteCalculado : 0}
              readOnly
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Forma de pagamento</label>
            <select className="form-control" name="formaPagamento" value={form.formaPagamento} onChange={handleChange}>
              <option value="dinheiro">💵 Dinheiro</option>
              <option value="pix">📱 PIX</option>
              <option value="cartao">💳 Cartão</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">
              Parcelas {form.formaPagamento !== 'cartao' && '(somente cartão)'}
            </label>
            <select
              className="form-control"
              name="parcelas"
              value={form.parcelas}
              onChange={handleChange}
              disabled={form.formaPagamento !== 'cartao'}
            >
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                <option key={n} value={n}>{n}x {n === 1 ? '(à vista)' : ''}</option>
              ))}
            </select>
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
            Confirmar Agendamento
          </button>
        </Modal.Footer>
      </Modal>

      {/* ── Modal Ver Agendamento ── */}
      <Modal
        open={!!modalVer}
        onClose={() => setModalVer(null)}
        title="Detalhes do Agendamento"
        width="500px"
      >
        {modalVer && (
          <div>
            {/* Infláveis */}
            <div className="form-group">
              <span className="form-label">Infláveis</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                {modalVer.inflaveis?.map((inf, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 12px', background: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)', fontSize: 13,
                  }}>
                    <span style={{ fontWeight: 600 }}>{inf.nome}</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                      {formatCurrency(inf.valor)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-grid" style={{ marginTop: 12 }}>
              <DetailItem label="Cliente"   value={modalVer.clienteNome} />
              <DetailItem label="Data"      value={formatDate(modalVer.data)} />
              <DetailItem label="Horário"   value={`${modalVer.horaInicio} às ${modalVer.horaFim}`} />
              <DetailItem label="Endereço"  value={modalVer.endereco || '—'} />
            </div>

            <div className="divider" />

            {/* Pagamento */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 10 }}>
              💳 Pagamento
            </div>
            <div className="detail-grid">
              <DetailItem label="Total"          value={formatCurrency(modalVer.valorTotal)} highlight />
              <DetailItem label="Entrada paga"   value={formatCurrency(modalVer.valorEntrada)} />
              <DetailItem label="Restante"       value={formatCurrency(modalVer.valorRestante)} />
              <DetailItem
                label="Forma"
                value={
                  modalVer.formaPagamento === 'dinheiro' ? '💵 Dinheiro' :
                  modalVer.formaPagamento === 'pix'      ? '📱 PIX' :
                  `💳 Cartão ${modalVer.parcelas}x`
                }
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

            <div className="divider" />
            <div className="form-group">
              <label className="form-label">Alterar status</label>
              <select
                className="form-control"
                value={modalVer.status}
                onChange={e => handleStatusChange(modalVer.id, e.target.value)}
              >
                <option value="novo">Novo</option>
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
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
    clienteId:      '',
    data:           '',
    horaInicioH:    '09',
    horaInicioM:    '00',
    horaFimH:       '18',
    horaFimM:       '00',
    endereco:       '',
    inflaveis:      [{ inflavelId: '', valor: '' }],
    valorEntrada:   '',
    formaPagamento: 'pix',
    parcelas:       '1',
    observacoes:    '',
  }
}

function dotColor(status) {
  const map = {
    confirmado: '#1D9E75',
    pendente:   '#EF9F27',
    novo:       '#378ADD',
    cancelado:  '#E24B4A',
  }
  return map[status] || '#9CA3AF'
}

function DetailItem({ label, value, highlight }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className={`detail-value ${highlight ? 'detail-highlight' : ''}`}>{value}</span>
    </div>
  )
}