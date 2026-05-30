// =============================================
//   ESPAÇO KIDS LOCAÇÕES — Mock Data
//   src/data/mockData.js
// =============================================

// ── Clientes ──────────────────────────────────
export const clientes = [
  {
    id: 1,
    nome: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    telefone: "(47) 9 9812-3456",
    cidade: "Ituporanga",
    totalAgendamentos: 5,
    totalGasto: 1400,
    dataCadastro: "2025-08-10",
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    email: "carlos.m@gmail.com",
    telefone: "(47) 9 9765-4321",
    cidade: "Ituporanga",
    totalAgendamentos: 3,
    totalGasto: 960,
    dataCadastro: "2025-09-22",
  },
  {
    id: 3,
    nome: "Márcia Oliveira",
    email: "marcia.o@hotmail.com",
    telefone: "(47) 9 8834-5678",
    cidade: "Trombudo Central",
    totalAgendamentos: 7,
    totalGasto: 2100,
    dataCadastro: "2025-07-05",
  },
  {
    id: 4,
    nome: "Rafael Souza",
    email: "rafael.s@gmail.com",
    telefone: "(47) 9 9123-9876",
    cidade: "Agronômica",
    totalAgendamentos: 2,
    totalGasto: 680,
    dataCadastro: "2026-01-14",
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    email: "fer.lima@email.com",
    telefone: "(47) 9 9456-7890",
    cidade: "Ituporanga",
    totalAgendamentos: 4,
    totalGasto: 1150,
    dataCadastro: "2025-11-30",
  },
  {
    id: 6,
    nome: "João Pedro Costa",
    email: "joaopedro@gmail.com",
    telefone: "(47) 9 8741-2233",
    cidade: "Ituporanga",
    totalAgendamentos: 1,
    totalGasto: 350,
    dataCadastro: "2026-03-08",
  },
  {
    id: 7,
    nome: "Patrícia Nunes",
    email: "pat.nunes@hotmail.com",
    telefone: "(47) 9 9654-8800",
    cidade: "Laurentino",
    totalAgendamentos: 6,
    totalGasto: 1800,
    dataCadastro: "2025-06-19",
  },
]

// ── Infláveis ──────────────────────────────────
export const inflaveis = [
  {
    id: 1,
    nome: "Castelo Encantado",
    emoji: "🏰",
    precoDia: 350,
    dimensoes: "ALT 3,50m COM 4m LAR 4m",
    idadeMinima: "3 anos",
    capacidade: "10 crianças",
    status: "alugado",
    descricao: "Castelo temático com escorregador e torres coloridas.",
    totalAlugueis: 9,
  },
  {
    id: 2,
    nome: "Tobogã Aquático",
    emoji: "🌊",
    precoDia: 280,
    dimensoes: "ALT 2,80m COM 8m LAR 3m",
    idadeMinima: "5 anos",
    capacidade: "8 crianças",
    status: "disponivel",
    descricao: "Tobogã com piscina de chegada, ideal para o verão.",
    totalAlugueis: 7,
  },
  {
    id: 3,
    nome: "Pula-Pula XL",
    emoji: "🎪",
    precoDia: 240,
    dimensoes: "ALT 2,20m COM 5m LAR 5m",
    idadeMinima: "2 anos",
    capacidade: "15 crianças",
    status: "disponivel",
    descricao: "Clássico pula-pula em tamanho extra grande.",
    totalAlugueis: 12,
  },
  {
    id: 4,
    nome: "Piscina de Bolinhas",
    emoji: "🔵",
    precoDia: 180,
    dimensoes: "ALT 0,80m COM 3m LAR 3m",
    idadeMinima: "1 ano",
    capacidade: "12 crianças",
    status: "manutencao",
    descricao: "Piscina inflável repleta de bolinhas coloridas.",
    totalAlugueis: 6,
  },
  {
    id: 5,
    nome: "Escorregador Dinossauro",
    emoji: "🐉",
    precoDia: 320,
    dimensoes: "ALT 4,20m COM 6m LAR 3m",
    idadeMinima: "3 anos",
    capacidade: "10 crianças",
    status: "disponivel",
    descricao: "Escorregador temático em formato de dinossauro.",
    totalAlugueis: 4,
  },
  {
    id: 6,
    nome: "Combo Festa",
    emoji: "🎉",
    precoDia: 680,
    dimensoes: "ALT 3m COM 10m LAR 8m",
    idadeMinima: "2 anos",
    capacidade: "30 crianças",
    status: "disponivel",
    descricao: "Pula-Pula XL + Castelo + Piscina de Bolinhas juntos.",
    totalAlugueis: 3,
  },
]

// ── Agendamentos ───────────────────────────────
export const agendamentos = [
  {
    id: 1,
    clienteId: 1,
    clienteNome: "Ana Paula Ferreira",
    inflaveis: [
      { id: 1, nome: "Castelo Encantado", valor: 350 },
    ],
    data: "2026-05-26",
    horaInicio: "09:00",
    horaFim: "17:00",
    endereco: "Rua das Flores, 123 — Ituporanga",
    valorTotal: 350,
    valorEntrada: 100,
    valorRestante: 250,
    formaPagamento: "pix",
    parcelas: 1,
    status: "confirmado",
    observacoes: "Festa de aniversário — 5 anos",
  },
  {
    id: 2,
    clienteId: 2,
    clienteNome: "Carlos Mendes",
    inflaveis: [
      { id: 3, nome: "Pula-Pula XL", valor: 240 },
      { id: 2, nome: "Tobogã Aquático", valor: 280 },
    ],
    data: "2026-05-28",
    horaInicio: "10:00",
    horaFim: "18:00",
    endereco: "Av. Central, 456 — Ituporanga",
    valorTotal: 520,
    valorEntrada: 150,
    valorRestante: 370,
    formaPagamento: "cartao",
    parcelas: 3,
    status: "pendente",
    observacoes: "",
  },
  {
    id: 3,
    clienteId: 3,
    clienteNome: "Márcia Oliveira",
    inflaveis: [
      { id: 4, nome: "Piscina de Bolinhas", valor: 180 },
    ],
    data: "2026-05-30",
    horaInicio: "13:00",
    horaFim: "19:00",
    endereco: "Rua Sete de Setembro, 78 — Trombudo Central",
    valorTotal: 280,
    valorEntrada: 80,
    valorRestante: 200,
    formaPagamento: "dinheiro",
    parcelas: 1,
    status: "confirmado",
    observacoes: "Levar bomba extra",
  },
  {
    id: 4,
    clienteId: 4,
    clienteNome: "Rafael Souza",
    inflaveis: [
      { id: 6, nome: "Combo Festa", valor: 680 },
    ],
    data: "2026-05-31",
    horaInicio: "09:00",
    horaFim: "20:00",
    endereco: "Rua dos Ipês, 200 — Agronômica",
    valorTotal: 680,
    valorEntrada: 200,
    valorRestante: 480,
    formaPagamento: "pix",
    parcelas: 1,
    status: "novo",
    observacoes: "Confirmar sinal até 28/05",
  },
  {
    id: 5,
    clienteId: 5,
    clienteNome: "Fernanda Lima",
    inflaveis: [
      { id: 2, nome: "Tobogã Aquático", valor: 280 },
    ],
    data: "2026-06-07",
    horaInicio: "10:00",
    horaFim: "17:00",
    endereco: "Rua das Palmeiras, 33 — Ituporanga",
    valorTotal: 280,
    valorEntrada: 100,
    valorRestante: 180,
    formaPagamento: "cartao",
    parcelas: 2,
    status: "confirmado",
    observacoes: "",
  },
  {
    id: 6,
    clienteId: 7,
    clienteNome: "Patrícia Nunes",
    inflaveis: [
      { id: 5, nome: "Escorregador Dinossauro", valor: 320 },
    ],
    data: "2026-06-14",
    horaInicio: "08:00",
    horaFim: "16:00",
    endereco: "Av. Brasil, 900 — Laurentino",
    valorTotal: 320,
    valorEntrada: 100,
    valorRestante: 220,
    formaPagamento: "dinheiro",
    parcelas: 1,
    status: "confirmado",
    observacoes: "",
  },
]

// ── Lançamentos Financeiros ────────────────────
export const lancamentos = [
  { id: 1,  tipo: "entrada", descricao: "Ana Paula — Castelo Encantado",    categoria: "Aluguel de inflável", valor: 350, data: "2026-05-24" },
  { id: 2,  tipo: "saida",   descricao: "Manutenção Piscina de Bolinhas",   categoria: "Manutenção",          valor: 180, data: "2026-05-23" },
  { id: 3,  tipo: "entrada", descricao: "Márcia Oliveira — Pula-Pula",      categoria: "Aluguel de inflável", valor: 240, data: "2026-05-21" },
  { id: 4,  tipo: "saida",   descricao: "Combustível — entrega e retirada", categoria: "Combustível",         valor: 95,  data: "2026-05-19" },
  { id: 5,  tipo: "entrada", descricao: "Rafael Souza — Combo Festa",       categoria: "Aluguel de inflável", valor: 680, data: "2026-05-17" },
  { id: 6,  tipo: "saida",   descricao: "Compra de bomba reserva",          categoria: "Equipamentos",        valor: 320, data: "2026-05-15" },
  { id: 7,  tipo: "entrada", descricao: "Patrícia Nunes — Tobogã",          categoria: "Aluguel de inflável", valor: 280, data: "2026-05-14" },
  { id: 8,  tipo: "entrada", descricao: "João Pedro — Castelo Encantado",   categoria: "Aluguel de inflável", valor: 350, data: "2026-05-11" },
  { id: 9,  tipo: "saida",   descricao: "Material de limpeza",              categoria: "Outros",              valor: 65,  data: "2026-05-10" },
  { id: 10, tipo: "entrada", descricao: "Fernanda Lima — Escorregador",     categoria: "Aluguel de inflável", valor: 320, data: "2026-05-07" },
  { id: 11, tipo: "saida",   descricao: "Reparo costura Pula-Pula XL",      categoria: "Manutenção",          valor: 150, data: "2026-05-05" },
  { id: 12, tipo: "entrada", descricao: "Carlos Mendes — Pula-Pula",        categoria: "Aluguel de inflável", valor: 240, data: "2026-05-04" },
  { id: 13, tipo: "entrada", descricao: "Ana Paula — Tobogã Aquático",      categoria: "Aluguel de inflável", valor: 280, data: "2026-05-02" },
  { id: 14, tipo: "saida",   descricao: "Renovação alvará prefeitura",      categoria: "Taxas",               valor: 180, data: "2026-05-01" },
  { id: 15, tipo: "entrada", descricao: "Márcia Oliveira — Combo Festa",    categoria: "Aluguel de inflável", valor: 680, data: "2026-04-27" },
  { id: 16, tipo: "entrada", descricao: "Ana Paula — Pula-Pula XL",         categoria: "Aluguel de inflável", valor: 240, data: "2026-04-15" },
  { id: 17, tipo: "saida",   descricao: "Manutenção geral",                 categoria: "Manutenção",          valor: 220, data: "2026-04-10" },
  { id: 18, tipo: "entrada", descricao: "Rafael — Tobogã Aquático",         categoria: "Aluguel de inflável", valor: 280, data: "2026-03-22" },
  { id: 19, tipo: "entrada", descricao: "Carlos — Escorregador",            categoria: "Aluguel de inflável", valor: 320, data: "2026-03-10" },
  { id: 20, tipo: "saida",   descricao: "Combustível março",                categoria: "Combustível",         valor: 110, data: "2026-03-05" },
  { id: 21, tipo: "entrada", descricao: "Fernanda — Castelo Encantado",     categoria: "Aluguel de inflável", valor: 350, data: "2026-02-20" },
  { id: 22, tipo: "entrada", descricao: "Patrícia — Combo Festa",           categoria: "Aluguel de inflável", valor: 680, data: "2026-02-14" },
  { id: 23, tipo: "saida",   descricao: "Equipamentos fevereiro",           categoria: "Equipamentos",        valor: 280, data: "2026-02-08" },
  { id: 24, tipo: "entrada", descricao: "João Pedro — Pula-Pula",           categoria: "Aluguel de inflável", valor: 240, data: "2026-01-25" },
  { id: 25, tipo: "saida",   descricao: "Manutenção janeiro",               categoria: "Manutenção",          valor: 160, data: "2026-01-10" },
]

// ── Dados mensais — 12 meses do ano ───────────
export const dadosMensais = [
  { mes: "Jan", receita: 3100, despesa: 710  },
  { mes: "Fev", receita: 3400, despesa: 890  },
  { mes: "Mar", receita: 3800, despesa: 780  },
  { mes: "Abr", receita: 4200, despesa: 1050 },
  { mes: "Mai", receita: 4820, despesa: 1340 },
  { mes: "Jun", receita: 5100, despesa: 1200 },
  { mes: "Jul", receita: 4600, despesa: 980  },
  { mes: "Ago", receita: 3900, despesa: 870  },
  { mes: "Set", receita: 3500, despesa: 760  },
  { mes: "Out", receita: 4100, despesa: 920  },
  { mes: "Nov", receita: 4700, despesa: 1100 },
  { mes: "Dez", receita: 5300, despesa: 1400 },
]

// ── Dados semanais — semanas do ano ───────────
export const dadosSemanais = [
  { semana: "Sem 1",  valor: 1200 },
  { semana: "Sem 2",  valor: 980  },
  { semana: "Sem 3",  valor: 1450 },
  { semana: "Sem 4",  valor: 1100 },
  { semana: "Sem 5",  valor: 1600 },
  { semana: "Sem 6",  valor: 890  },
  { semana: "Sem 7",  valor: 1320 },
  { semana: "Sem 8",  valor: 1750 },
  { semana: "Sem 9",  valor: 1400 },
  { semana: "Sem 10", valor: 1050 },
  { semana: "Sem 11", valor: 1680 },
  { semana: "Sem 12", valor: 2100 },
  { semana: "Sem 13", valor: 1900 },
  { semana: "Sem 14", valor: 1550 },
  { semana: "Sem 15", valor: 1800 },
  { semana: "Sem 16", valor: 2200 },
  { semana: "Sem 17", valor: 1650 },
  { semana: "Sem 18", valor: 1980 },
  { semana: "Sem 19", valor: 2350 },
  { semana: "Sem 20", valor: 2480 },
  { semana: "Sem 21", valor: 2100 },
  { semana: "Sem 22", valor: 1870 },
]

// ── Helpers ────────────────────────────────────

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(dateStr) {
  if (!dateStr) return ""
  const [year, month, day] = dateStr.split("-")
  return `${day}/${month}/${year}`
}

export function getStatusInfo(status) {
  const map = {
    confirmado:  { label: "Confirmado",  className: "badge-green" },
    pendente:    { label: "Pendente",    className: "badge-amber" },
    novo:        { label: "Novo",        className: "badge-blue"  },
    cancelado:   { label: "Cancelado",   className: "badge-red"   },
    disponivel:  { label: "Disponível",  className: "badge-green" },
    alugado:     { label: "Alugado",     className: "badge-amber" },
    manutencao:  { label: "Manutenção",  className: "badge-red"   },
    entrada:     { label: "Entrada",     className: "badge-green" },
    saida:       { label: "Saída",       className: "badge-red"   },
  }
  return map[status] || { label: status, className: "badge-gray" }
}

// Máscara de telefone: (47) 9 9672-9087
export function maskTelefone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2)  return `(${digits}`
  if (digits.length <= 3)  return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  if (digits.length <= 7)  return `(${digits.slice(0,2)}) ${digits.slice(2,3)} ${digits.slice(3)}`
  return `(${digits.slice(0,2)}) ${digits.slice(2,3)} ${digits.slice(3,7)}-${digits.slice(7)}`
}

// Retorna mês/ano como label
export function getMesLabel(mesIndex) {
  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
  ]
  return meses[mesIndex] || ""
}