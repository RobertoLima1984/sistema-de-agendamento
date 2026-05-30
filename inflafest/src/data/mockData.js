// =============================================
//   INFLAFEST — Mock Data
//   src/data/mockData.js
// =============================================

// ── Clientes ──────────────────────────────────
export const clientes = [
  {
    id: 1,
    nome: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    telefone: "(47) 99812-3456",
    cidade: "Ituporanga",
    totalAgendamentos: 5,
    totalGasto: 1400,
    dataCadastro: "2025-08-10",
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    email: "carlos.m@gmail.com",
    telefone: "(47) 99765-4321",
    cidade: "Ituporanga",
    totalAgendamentos: 3,
    totalGasto: 960,
    dataCadastro: "2025-09-22",
  },
  {
    id: 3,
    nome: "Márcia Oliveira",
    email: "marcia.o@hotmail.com",
    telefone: "(47) 98834-5678",
    cidade: "Trombudo Central",
    totalAgendamentos: 7,
    totalGasto: 2100,
    dataCadastro: "2025-07-05",
  },
  {
    id: 4,
    nome: "Rafael Souza",
    email: "rafael.s@gmail.com",
    telefone: "(47) 99123-9876",
    cidade: "Agronômica",
    totalAgendamentos: 2,
    totalGasto: 680,
    dataCadastro: "2026-01-14",
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    email: "fer.lima@email.com",
    telefone: "(47) 99456-7890",
    cidade: "Ituporanga",
    totalAgendamentos: 4,
    totalGasto: 1150,
    dataCadastro: "2025-11-30",
  },
  {
    id: 6,
    nome: "João Pedro Costa",
    email: "joaopedro@gmail.com",
    telefone: "(47) 98741-2233",
    cidade: "Ituporanga",
    totalAgendamentos: 1,
    totalGasto: 350,
    dataCadastro: "2026-03-08",
  },
  {
    id: 7,
    nome: "Patrícia Nunes",
    email: "pat.nunes@hotmail.com",
    telefone: "(47) 99654-8800",
    cidade: "Laurentino",
    totalAgendamentos: 6,
    totalGasto: 1800,
    dataCadastro: "2025-06-19",
  },
];

// ── Infláveis ──────────────────────────────────
export const inflaveis = [
  {
    id: 1,
    nome: "Castelo Encantado",
    emoji: "🏰",
    precoDia: 350,
    dimensoes: "4m x 4m",
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
    dimensoes: "8m x 3m",
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
    dimensoes: "5m x 5m",
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
    dimensoes: "3m x 3m",
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
    dimensoes: "6m x 3m",
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
    dimensoes: "Vários",
    idadeMinima: "2 anos",
    capacidade: "30 crianças",
    status: "disponivel",
    descricao: "Pula-Pula XL + Castelo + Piscina de Bolinhas juntos.",
    totalAlugueis: 3,
  },
];

// ── Agendamentos ───────────────────────────────
export const agendamentos = [
  {
    id: 1,
    clienteId: 1,
    clienteNome: "Ana Paula Ferreira",
    inflavelId: 1,
    inflavelNome: "Castelo Encantado",
    data: "2026-05-26",
    horaInicio: "09:00",
    horaFim: "17:00",
    endereco: "Rua das Flores, 123 — Ituporanga",
    valor: 350,
    status: "confirmado",
    observacoes: "Festa de aniversário — 5 anos",
  },
  {
    id: 2,
    clienteId: 2,
    clienteNome: "Carlos Mendes",
    inflavelId: 3,
    inflavelNome: "Pula-Pula XL + Tobogã",
    data: "2026-05-28",
    horaInicio: "10:00",
    horaFim: "18:00",
    endereco: "Av. Central, 456 — Ituporanga",
    valor: 520,
    status: "pendente",
    observacoes: "",
  },
  {
    id: 3,
    clienteId: 3,
    clienteNome: "Márcia Oliveira",
    inflavelId: 4,
    inflavelNome: "Piscina de Bolinhas",
    data: "2026-05-30",
    horaInicio: "13:00",
    horaFim: "19:00",
    endereco: "Rua Sete de Setembro, 78 — Trombudo Central",
    valor: 280,
    status: "confirmado",
    observacoes: "Levar bomba extra",
  },
  {
    id: 4,
    clienteId: 4,
    clienteNome: "Rafael Souza",
    inflavelId: 6,
    inflavelNome: "Combo Festa",
    data: "2026-05-31",
    horaInicio: "09:00",
    horaFim: "20:00",
    endereco: "Rua dos Ipês, 200 — Agronômica",
    valor: 680,
    status: "novo",
    observacoes: "Confirmar sinal até 28/05",
  },
  {
    id: 5,
    clienteId: 5,
    clienteNome: "Fernanda Lima",
    inflavelId: 2,
    inflavelNome: "Tobogã Aquático",
    data: "2026-06-07",
    horaInicio: "10:00",
    horaFim: "17:00",
    endereco: "Rua das Palmeiras, 33 — Ituporanga",
    valor: 280,
    status: "confirmado",
    observacoes: "",
  },
  {
    id: 6,
    clienteId: 7,
    clienteNome: "Patrícia Nunes",
    inflavelId: 5,
    inflavelNome: "Escorregador Dinossauro",
    data: "2026-06-14",
    horaInicio: "08:00",
    horaFim: "16:00",
    endereco: "Av. Brasil, 900 — Laurentino",
    valor: 320,
    status: "confirmado",
    observacoes: "",
  },
];

// ── Lançamentos Financeiros ────────────────────
export const lancamentos = [
  {
    id: 1,
    tipo: "entrada",
    descricao: "Ana Paula — Castelo Encantado",
    categoria: "Aluguel de inflável",
    valor: 350,
    data: "2026-05-24",
  },
  {
    id: 2,
    tipo: "saida",
    descricao: "Manutenção Piscina de Bolinhas",
    categoria: "Manutenção",
    valor: 180,
    data: "2026-05-23",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Márcia Oliveira — Pula-Pula",
    categoria: "Aluguel de inflável",
    valor: 240,
    data: "2026-05-21",
  },
  {
    id: 4,
    tipo: "saida",
    descricao: "Combustível — entrega e retirada",
    categoria: "Combustível",
    valor: 95,
    data: "2026-05-19",
  },
  {
    id: 5,
    tipo: "entrada",
    descricao: "Rafael Souza — Combo Festa",
    categoria: "Aluguel de inflável",
    valor: 680,
    data: "2026-05-17",
  },
  {
    id: 6,
    tipo: "saida",
    descricao: "Compra de bomba reserva",
    categoria: "Equipamentos",
    valor: 320,
    data: "2026-05-15",
  },
  {
    id: 7,
    tipo: "entrada",
    descricao: "Patrícia Nunes — Tobogã",
    categoria: "Aluguel de inflável",
    valor: 280,
    data: "2026-05-14",
  },
  {
    id: 8,
    tipo: "entrada",
    descricao: "João Pedro — Castelo Encantado",
    categoria: "Aluguel de inflável",
    valor: 350,
    data: "2026-05-11",
  },
  {
    id: 9,
    tipo: "saida",
    descricao: "Material de limpeza",
    categoria: "Outros",
    valor: 65,
    data: "2026-05-10",
  },
  {
    id: 10,
    tipo: "entrada",
    descricao: "Fernanda Lima — Escorregador",
    categoria: "Aluguel de inflável",
    valor: 320,
    data: "2026-05-07",
  },
  {
    id: 11,
    tipo: "saida",
    descricao: "Reparo costura Pula-Pula XL",
    categoria: "Manutenção",
    valor: 150,
    data: "2026-05-05",
  },
  {
    id: 12,
    tipo: "entrada",
    descricao: "Carlos Mendes — Pula-Pula",
    categoria: "Aluguel de inflável",
    valor: 240,
    data: "2026-05-04",
  },
  {
    id: 13,
    tipo: "entrada",
    descricao: "Ana Paula — Tobogã Aquático",
    categoria: "Aluguel de inflável",
    valor: 280,
    data: "2026-05-02",
  },
  {
    id: 14,
    tipo: "saida",
    descricao: "Renovação alvará prefeitura",
    categoria: "Taxas",
    valor: 180,
    data: "2026-05-01",
  },
  {
    id: 15,
    tipo: "entrada",
    descricao: "Márcia Oliveira — Combo Festa",
    categoria: "Aluguel de inflável",
    valor: 680,
    data: "2026-04-27",
  },
];

// ── Dados dos gráficos (últimos 6 meses) ──────
export const dadosMensais = [
  { mes: "Dez", receita: 2800, despesa: 620 },
  { mes: "Jan", receita: 3100, despesa: 710 },
  { mes: "Fev", receita: 3400, despesa: 890 },
  { mes: "Mar", receita: 4100, despesa: 980 },
  { mes: "Abr", receita: 3900, despesa: 1100 },
  { mes: "Mai", receita: 4820, despesa: 1340 },
];

// ── Dados do gráfico semanal ───────────────────
export const dadosSemanais = [
  { dia: "Seg", valor: 480 },
  { dia: "Ter", valor: 690 },
  { dia: "Qua", valor: 320 },
  { dia: "Qui", valor: 750 },
  { dia: "Sex", valor: 920 },
  { dia: "Sáb", valor: 870 },
  { dia: "Dom", valor: 790 },
];

// ── Helpers ────────────────────────────────────

// Formata valor em R$
export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Formata data de "2026-05-26" para "26/05/2026"
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

// Retorna label e classe CSS do status
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
  };
  return map[status] || { label: status, className: "badge-gray" };
}