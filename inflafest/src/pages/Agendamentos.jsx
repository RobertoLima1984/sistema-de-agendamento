// =============================================
//   INFLAFEST — Agendamentos Page
//   src/pages/Agendamentos.jsx
// =============================================

import { useState } from 'react'
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'

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

export default function Agendamentos() {
  const hoje = new Date()

  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais)
  const [mesAtual, setMesAtual]         = useState(hoje.getMonth())
  const [anoAtual, setAnoAtual]         = useState(hoje.getFullYear())
  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [modalNovo, setModalNovo]       = useState(false)
  const [modalVer, setModalVer]         = useState(null)
  const [form, setForm]                 = useState(formVazio())

  function mesAnterior() {
    if (mesAtual === 0) { setMesAtual(11); setAnoAtual(a => a - 1) }
    else setMesAtual(m => m - 1)
  }

  function proximoMes() {
    if (mesAtual === 11) { setMesAtual(0); setAnoAtual(a => a + 1) }
    else setMesAtual(m => m + 1)
  }

  function getDiasCalendario() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay()
    const totalDias   = new Date(anoAtual, mesAtual + 1, 0).getDate()
    const diasMesAnt  = new Date(anoAtual, mesAtual, 0).getDate()
    const dias = []
    for (let i = primeiroDia - 1; i >= 0; i--) {
      dias.push({ dia: diasMesAnt - i, mesAtual: false })
    }
    for (let i = 1; i <= totalDias; i++) {
      dias.push({ dia: i, mesAtual: true })
    }
    const restante = 42 - dias.length
    for (let i = 1; i <= restante; i++) {
      dias.push({ dia: i, mesAtual: false })
    }
    return dias
  }

  function agendamentosDoDia(dia) {
    const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`
    return agendamentos.filter(a => a.data === dataStr)
  }

  function temAgendamento(dia) {
    return agendamentosDoDia(dia).length > 0
  }

  function eHoje(dia) {
    return dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()
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

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSalvar() {
    if (!form.clienteId || !form.inflavelId || !form.data) {
      return alert('Cliente, inflável e data são obrigatórios.')
    }
    const cliente  = clientes.find(c => c.id === Number(form.clienteId))
    const inflavel = inflaveis.find(i => i.id === Number(form.inflavelId))
    const novo = {
      id: agendamentos.length + 1,
      clienteId:    Number(form.clienteId),
      clienteNome:  cliente?.nome || '',
      inflavelId:   Number(form.inflavelId),
      inflavelNome: inflavel?.nome || '',
      data:         form.data,
      horaInicio:   form.horaInicio,
      horaFim:      form.horaFim,
      endereco:     form.endereco,
      valor:        Number(form.valor) || inflavel?.precoDia || 0,
      status:       'novo',
      observacoes:  form.observacoes,
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
        {/* Calendário */}
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
              <span className="cal-dot-sm" /> Com agendamento
            </span>
          </div>
        </div>

        {/* Lista */}
        <div className="card" style={{ flex: 1 }}>
          <div className="card-title">
            <CalendarDays size={15} />
            {diaSelecionado
              ? `Agendamentos — ${String(diaSelecionado).padStart(2,'0')}/${String(mesAtual+1).padStart(2,'0')}`
              : `${MESES[mesAtual]} ${anoAtual}`
            }
            {diaSelecionado && (
              <button
                className="btn btn-sm"
                style={{ marginLeft: 'auto', fontSize: 11 }}
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
                      {ag.inflavelNome} · {formatDate(ag.data)} · {ag.horaInicio}–{ag.horaFim}
                    </div>
                  </div>
                  <div className="agenda-right">
                    <span className="agenda-valor">{formatCurrency(ag.valor)}</span>
                    <Badge status={ag.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Novo Agendamento */}
      <Modal
        open={modalNovo}
        onClose={() => { setModalNovo(false); setForm(formVazio()) }}
        title="Novo Agendamento"
        width="520px"
      >
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cliente *</label>
            <select className="form-control" name="clienteId" value={form.clienteId} onChange={handleChange}>
              <option value="">Selecione o cliente</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Inflável *</label>
            <select className="form-control" name="inflavelId" value={form.inflavelId} onChange={handleChange}>
              <option value="">Selecione o inflável</option>
              {inflaveis.map(i => (
                <option key={i.id} value={i.id}>{i.emoji} {i.nome} — {formatCurrency(i.precoDia)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data *</label>
            <input className="form-control" type="date" name="data" value={form.data} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Valor (R$)</label>
            <input className="form-control" type="number" name="valor" placeholder="0,00" value={form.valor} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Hora início</label>
            <input className="form-control" type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Hora fim</label>
            <input className="form-control" type="time" name="horaFim" value={form.horaFim} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Endereço de entrega</label>
          <input className="form-control" name="endereco" placeholder="Rua, número, bairro, cidade" value={form.endereco} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Observações</label>
          <textarea className="form-control" name="observacoes" placeholder="Informações adicionais..." value={form.observacoes} onChange={handleChange} />
        </div>
        <Modal.Footer>
          <button className="btn" onClick={() => { setModalNovo(false); setForm(formVazio()) }}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSalvar}>Confirmar Agendamento</button>
        </Modal.Footer>
      </Modal>

      {/* Modal Ver Agendamento */}
      <Modal
        open={!!modalVer}
        onClose={() => setModalVer(null)}
        title="Detalhes do Agendamento"
        width="480px"
      >
        {modalVer && (
          <div>
            <div className="detail-grid">
              <DetailItem label="Cliente"  value={modalVer.clienteNome} />
              <DetailItem label="Inflável" value={modalVer.inflavelNome} />
              <DetailItem label="Data"     value={formatDate(modalVer.data)} />
              <DetailItem label="Horário"  value={`${modalVer.horaInicio} às ${modalVer.horaFim}`} />
              <DetailItem label="Endereço" value={modalVer.endereco || '—'} />
              <DetailItem label="Valor"    value={formatCurrency(modalVer.valor)} highlight />
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

function formVazio() {
  return {
    clienteId: '', inflavelId: '', data: '',
    horaInicio: '09:00', horaFim: '18:00',
    endereco: '', valor: '', observacoes: '',
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