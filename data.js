// ============================================================
//  DATA.JS — Banco de dados local do Painel SST · Logística
//  Separação total entre dados e interface (padrão MVC)
// ============================================================

export const empresa = {
  nome: "TransLog Espírito Santo Ltda.",
  cnpj: "12.345.678/0001-90",
  cnae: "4930-2/01 — Transporte Rodoviário de Cargas",
  grauRisco: 3,
  responsavelSST: "Eng. Carlos Mendes (CREA-ES 12345)",
  totalFuncionarios: 48,
  dataUltimaAtualizacao: "2025-04-01",
  alertas: [
    { tipo: "critico", msg: "Risco de inconformidade com eSocial — evento S-2240 pendente de envio." },
    { tipo: "alerta", msg: "PCMSO vence em 45 dias. Agendar exames periódicos." },
    { tipo: "info", msg: "Treinamento NR-11 programado para 15/05/2025." }
  ]
};

// ── Q1 e Q2 ─ Riscos por setor com ações PGR/PCMSO ──────────
export const riscos = [
  {
    id: 1,
    setor: "Estrada · Motorista",
    tipo: "Fisico",
    cor: "#10b981",
    agente: "Vibração de Corpo Inteiro (VCI)",
    fonte: "Motor do caminhão, pavimento irregular, suspensão desgastada",
    consequencia: "Microlesões na coluna vertebral, lombalgia crônica, hérnia de disco.",
    nr: "NR-9 / NR-15 Anexo 8",
    grau: "Médio",
    pgr: "Manutenção preventiva da suspensão e bancos pneumáticos a cada 10.000 km. Substituição de veículos com mais de 10 anos. Pausas obrigatórias a cada 2h de viagem.",
    pcmso: "Avaliação osteomuscular detalhada no ASO. Raio-X da coluna lombar e cervical. Acompanhamento com fisioterapeuta semestral.",
    esocial: "S-2240 (Condições Ambientais do Trabalho)"
  },
  {
    id: 2,
    setor: "Estrada · Motorista",
    tipo: "Fisico",
    cor: "#10b981",
    agente: "Ruído — Ruído de Motor e Trânsito",
    fonte: "Motor diesel, escapamento, ambiente externo de tráfego",
    consequencia: "PAIR — Perda Auditiva Induzida por Ruído, zumbido, irritabilidade.",
    nr: "NR-9 / NR-15 Anexo 1",
    grau: "Alto",
    pgr: "Manutenção do sistema de escapamento. Uso obrigatório de protetor auricular tipo concha durante carga/descarga em galpões ruidosos.",
    pcmso: "Audiometria tonal liminar admissional, periódica (anual) e demissional. Avaliação otorrinolaringológica em casos alterados.",
    esocial: "S-2220 (Monitoramento da Saúde do Trabalhador)"
  },
  {
    id: 3,
    setor: "Estrada · Motorista",
    tipo: "Psicossocial",
    cor: "#8b5cf6",
    agente: "Jornada Excessiva e Monotonia",
    fonte: "Rotas longas, pressão por entregas, trabalho noturno",
    consequencia: "Fadiga crônica, síndrome de burnout, risco elevado de acidentes de trânsito.",
    nr: "NR-17 / Lei 13.103/2015",
    grau: "Alto",
    pgr: "Controle de jornada via tacógrafo digital. Escala de revezamento. Proibição de horas extras além do limite legal. Programa de apoio psicológico.",
    pcmso: "Avaliação psicológica anual. Rastreamento de sinais de depressão e ansiedade. Exame toxicológico conforme legislação.",
    esocial: "S-2220 (Monitoramento da Saúde do Trabalhador)"
  },
  {
    id: 4,
    setor: "Galpão · Operador Logístico",
    tipo: "Ergonomico",
    cor: "#f59e0b",
    agente: "Levantamento e Transporte Manual de Cargas",
    fonte: "Caixas pesadas, paletes, postura inadequada no manuseio",
    consequencia: "Hérnia de disco, distensão muscular, LER/DORT, lombalgia aguda.",
    nr: "NR-17",
    grau: "Alto",
    pgr: "Treinamento obrigatório de ergonomia e postura. Implantação de carrinhos hidráulicos e paleteiras. Limite de 23 kg por trabalhador por levantamento.",
    pcmso: "Exames clínicos focados em articulações e coluna. Avaliação ergonômica postural. Encaminhamento preventivo a ortopedista.",
    esocial: "S-2220 e S-2240"
  },
  {
    id: 5,
    setor: "Galpão · Operador Logístico",
    tipo: "Acidente",
    cor: "#ef4444",
    agente: "Choque contra Empilhadeira / Veículos Internos",
    fonte: "Tráfego de empilhadeiras sem sinalização, piso molhado, iluminação deficiente",
    consequencia: "Trauma, fraturas, esmagamento de membros, óbito.",
    nr: "NR-11 / NR-12",
    grau: "Crítico",
    pgr: "Demarcação de corredores exclusivos para pedestres com tinta epóxi. Espelhos convexos nas esquinas cegas. Limitação de velocidade de 5 km/h. Buzina obrigatória em cruzamentos.",
    pcmso: "Habilitação e reciclagem anual dos operadores de empilhadeira. Pré-emprego com teste de acuidade visual e reflexos.",
    esocial: "S-2210 (Comunicação de Acidente do Trabalho)"
  },
  {
    id: 6,
    setor: "Galpão · Operador Logístico",
    tipo: "Quimico",
    cor: "#3b82f6",
    agente: "Poeira de Carga / Produtos Químicos",
    fonte: "Manuseio de sacas de farinha, cimento, produtos agroquímicos",
    consequencia: "Pneumoconiose, irritação de mucosas, reações alérgicas, intoxicação.",
    nr: "NR-9 / NR-15 Anexo 12",
    grau: "Médio",
    pgr: "EPI obrigatório: respirador PFF2 ou PFF3. Ventilação forçada no galpão. Segregação de cargas químicas. FISPQ disponível para todos os produtos.",
    pcmso: "Espirometria anual. Radiografia de tórax bienal. Avaliação dermatológica. Hemograma para produtos organofosforados.",
    esocial: "S-2220 e S-2240"
  },
  {
    id: 7,
    setor: "Galpão · Operador Logístico",
    tipo: "Biologico",
    cor: "#10b981",
    agente: "Exposição a Resíduos e Pragas",
    fonte: "Cargas alimentícias, presença de roedores, acúmulo de lixo",
    consequencia: "Leptospirose, hantavirose, infecções gastrointestinais.",
    nr: "NR-9 / NR-32 (referência)",
    grau: "Médio",
    pgr: "Programa de controle de pragas (DDD) trimestral. EPIs: luvas de borracha, avental impermeável. Limpeza e higienização diária do piso.",
    pcmso: "Vacinação: hepatite B, tétano, febre amarela. Sorologia para leptospirose em trabalhadores expostos. Exame parasitológico de fezes.",
    esocial: "S-2220 (Monitoramento da Saúde do Trabalhador)"
  }
];

// ── Q3 — Plano de Ação (5W2H) ────────────────────────────────
export const planoDeAcao = [
  {
    id: "PA-01",
    oque: "Instalar carrinhos hidráulicos e paleteiras elétricas",
    porque: "Eliminar levantamento manual de cargas acima de 23 kg",
    quem: "Gerência de Operações",
    quando: "30 dias",
    onde: "Galpão principal — área de carga e descarga",
    como: "Cotação com 3 fornecedores + aprovação do orçamento pela diretoria",
    quanto: "R$ 8.500,00",
    status: "andamento",
    prioridade: "Alta"
  },
  {
    id: "PA-02",
    oque: "Demarcação de corredores de segurança no galpão",
    porque: "Prevenir atropelamentos por empilhadeiras",
    quem: "SESMT + Manutenção",
    quando: "15 dias",
    onde: "Todo o piso do galpão",
    como: "Pintura epóxi amarela, instalação de espelhos convexos e placas de sinalização",
    quanto: "R$ 3.200,00",
    status: "pendente",
    prioridade: "Critica"
  },
  {
    id: "PA-03",
    oque: "Treinamento de ergonomia e postura para operadores",
    porque: "Reduzir incidência de LER/DORT e lombalgias",
    quem: "Técnico de Segurança do Trabalho",
    quando: "20 dias",
    onde: "Sala de treinamentos da empresa",
    como: "Treinamento presencial de 4h com simulações práticas + assinatura de lista de presença",
    quanto: "R$ 1.200,00",
    status: "pendente",
    prioridade: "Alta"
  },
  {
    id: "PA-04",
    oque: "Implantação de audiometria periódica para motoristas",
    porque: "Monitorar PAIR causada por ruído de motor diesel",
    quem: "Médico do Trabalho (PCMSO)",
    quando: "45 dias",
    onde: "Clínica ocupacional conveniada",
    como: "Agendamento em lotes por turno, integração com prontuário eletrônico",
    quanto: "R$ 85,00/funcionário",
    status: "andamento",
    prioridade: "Alta"
  },
  {
    id: "PA-05",
    oque: "Envio do evento S-2240 ao eSocial",
    porque: "Conformidade legal obrigatória — registro das condições ambientais",
    quem: "Departamento de RH + TST responsável",
    quando: "10 dias",
    onde: "Sistema eSocial (web)",
    como: "Preenchimento do LTCAT atualizado e envio via certificado digital",
    quanto: "R$ 0,00 (custo interno)",
    status: "atrasado",
    prioridade: "Critica"
  },
  {
    id: "PA-06",
    oque: "Programa de controle de pragas (DDD)",
    porque: "Eliminar vetores de doenças biológicas no galpão",
    quem: "Empresa terceirizada de dedetização",
    quando: "30 dias",
    onde: "Galpão + área externa",
    como: "Contrato trimestral com empresa licenciada. Laudo técnico arquivado no SST",
    quanto: "R$ 1.800,00/trimestre",
    status: "concluido",
    prioridade: "Media"
  }
];

// ── Q4 — Gestão de Documentos SST ────────────────────────────
export const documentos = {
  fisico: {
    titulo: "Arquivo Físico Controlado",
    descricao: "Documentos originais armazenados em armário metálico com chave, de acesso restrito ao RH e SESMT.",
    itens: ["PGR (Programa de Gerenciamento de Riscos)", "PCMSO e prontuários médicos", "ASOs originais assinados", "Fichas de EPI com assinatura do trabalhador", "Registros de treinamentos (listas de presença)", "CAT (Comunicação de Acidente de Trabalho)"],
    retencao: "Mínimo 20 anos (conforme CLT e NR-1)"
  },
  digital: {
    titulo: "Arquivo Digital + eSocial",
    descricao: "Cópias digitalizadas em nuvem com backup automático diário e integração via certificado digital ao portal eSocial.",
    itens: ["S-2210 — Comunicação de Acidente de Trabalho", "S-2220 — Monitoramento da Saúde do Trabalhador", "S-2240 — Condições Ambientais do Trabalho", "Laudos técnicos (LTCAT, LSPCIE)", "Relatórios do PGR em PDF", "Treinamentos em EAD com certificados digitais"],
    retencao: "Backup redundante em 3 servidores (conforme LGPD)"
  }
};

// ── Q5 — Indicadores de Desempenho SST ───────────────────────
export const indicadores = [
  { nome: "Taxa de Frequência de Acidentes", valor: 4.2, meta: "< 3.0", unidade: "acidentes/milhão HH", status: "atencao", variacao: -0.8 },
  { nome: "Taxa de Gravidade", valor: 120, meta: "< 100", unidade: "dias perdidos/milhão HH", status: "critico", variacao: +15 },
  { nome: "Índice de Treinamento SST", valor: 78, meta: "> 90%", unidade: "%", status: "atencao", variacao: +5 },
  { nome: "Conformidade de EPIs", valor: 91, meta: "> 95%", unidade: "%", status: "atencao", variacao: +3 },
  { nome: "Exames Periódicos em Dia", valor: 64, meta: "> 95%", unidade: "%", status: "critico", variacao: -12 },
  { nome: "Ações do Plano em Dia", valor: 67, meta: "> 80%", unidade: "%", status: "atencao", variacao: +2 }
];

// ── Q6 — Ciclo PDCA ──────────────────────────────────────────
export const pdca = {
  P: {
    letra: "P",
    titulo: "Plan — Planejar",
    cor: "#3b82f6",
    descricao: "Identificação e análise dos riscos ocupacionais via PGR. Definição de metas de segurança e elaboração do Plano de Ação (5W2H). Revisão do PCMSO com o médico do trabalho.",
    acoes: [
      "Levantamento dos riscos por setor (Físico, Químico, Biológico, Ergonômico, Acidentes)",
      "Priorização por nível de risco (Crítico → Alto → Médio → Baixo)",
      "Definição de responsáveis e prazos no Plano de Ação",
      "Orçamento dos recursos necessários"
    ]
  },
  D: {
    letra: "D",
    titulo: "Do — Executar",
    cor: "#10b981",
    descricao: "Implementação das medidas de controle previstas no PGR. Realização dos treinamentos obrigatórios. Fornecimento e controle de EPIs. Envio dos eventos ao eSocial.",
    acoes: [
      "Execução das obras e instalações (demarcações, equipamentos)",
      "Treinamentos NR-11, NR-17, NR-35 conforme calendário",
      "Realização dos exames do PCMSO (admissional, periódico, demissional)",
      "Envio dos eventos S-2210, S-2220, S-2240 ao eSocial"
    ]
  },
  C: {
    letra: "C",
    titulo: "Check — Verificar",
    cor: "#f59e0b",
    descricao: "Monitoramento contínuo dos indicadores de desempenho SST. Auditorias internas periódicas. Análise de acidentes e quase-acidentes. Revisão de conformidade com as NRs aplicáveis.",
    acoes: [
      "Cálculo mensal dos índices de frequência e gravidade",
      "Inspeção semanal de EPIs e condições dos postos de trabalho",
      "Análise de acidentes com emissão de CAT e investigação de causa-raiz",
      "Auditoria semestral do PGR e PCMSO"
    ]
  },
  A: {
    letra: "A",
    titulo: "Act — Agir",
    cor: "#ef4444",
    descricao: "Correção dos desvios identificados na fase de verificação. Atualização do PGR e PCMSO. Revisão das metas e reinício do ciclo com melhorias incorporadas.",
    acoes: [
      "Ações corretivas imediatas para desvios críticos",
      "Revisão anual obrigatória do PGR (NR-1)",
      "Atualização do PCMSO com base nos resultados dos exames",
      "Registro das lições aprendidas e incorporação ao próximo ciclo"
    ]
  }
};

// ── Resposta Reflexiva (pg 22) ────────────────────────────────
export const reflexao = {
  titulo: "Reflexão: Campo de Aplicação antes da Burocracia",
  texto: `A eficácia de um programa de SST não está na quantidade de documentos gerados, mas na
    profundidade do diagnóstico que o precede. Antes de preencher qualquer formulário ou emitir
    qualquer laudo, o profissional de segurança precisa imergir na realidade operacional da empresa:
    entender o CNAE, o grau de risco, os processos produtivos, o perfil dos trabalhadores e os
    riscos reais — não os teóricos.
    
    No setor de logística, isso significa andar pelo galpão, subir no caminhão, conversar com
    o motorista de longa distância. Só assim o PGR deixa de ser um documento de gaveta e passa
    a ser um instrumento real de proteção à vida. Burocracia sem diagnóstico é papel. Diagnóstico
    com ação é SST.`
};
