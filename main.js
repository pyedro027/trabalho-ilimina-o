// ============================================================
//  MAIN.JS — Lógica de manipulação do DOM
//  Painel SST · Logística
// ============================================================

import { empresa, riscos, planoDeAcao, documentos, indicadores, pdca, reflexao } from './data.js';

// ── UTILITÁRIOS ──────────────────────────────────────────────
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatMoeda(str) {
  return str; // já está formatado nos dados
}

// ── 1. STATUS ALERTS (Hero) ──────────────────────────────────
function renderAlerts() {
  const container = qs('#hero-alerts');
  if (!container) return;

  container.innerHTML = empresa.alertas.map(a => `
    <div class="alert-item">
      <span class="alert-dot ${a.tipo}"></span>
      <span>${a.msg}</span>
    </div>
  `).join('');
}

function renderHeroMeta() {
  const el = qs('#hero-meta');
  if (!el) return;
  el.innerHTML = `
    <div class="meta-item">
      <span class="meta-label">Empresa</span>
      <span class="meta-value">${empresa.nome}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">CNAE</span>
      <span class="meta-value">${empresa.cnae}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Grau de Risco</span>
      <span class="meta-value" style="color:var(--yellow)">GR ${empresa.grauRisco} — Médio</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Funcionários</span>
      <span class="meta-value">${empresa.totalFuncionarios}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Responsável SST</span>
      <span class="meta-value">${empresa.responsavelSST}</span>
    </div>
  `;
}

// ── 2. RISCOS — Grid de cards ────────────────────────────────
function tipoClass(tipo) {
  return 'tag-' + tipo.toLowerCase().replace(/\s+/g, '');
}

function grauClass(grau) {
  return 'grau-' + grau.toLowerCase();
}

function renderRiscos() {
  const container = qs('#riscos-grid');
  if (!container) return;

  container.innerHTML = riscos.map(r => `
    <div class="card risco-card" style="border-left-color:${r.cor}" data-id="${r.id}" tabindex="0" role="button" aria-label="Ver detalhes do risco: ${r.agente}">
      <div class="risco-card-header">
        <span class="risco-setor">${r.setor}</span>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap">
          <span class="tag ${tipoClass(r.tipo)}">${r.tipo}</span>
          <span class="tag ${grauClass(r.grau)}">${r.grau}</span>
        </div>
      </div>
      <div class="risco-agente">${r.agente}</div>
      <div class="risco-consequencia">${r.consequencia}</div>
    </div>
  `).join('');

  // Eventos de clique e teclado
  qsa('.risco-card').forEach(card => {
    const open = () => abrirModalRisco(parseInt(card.dataset.id));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

// ── 3. MODAL DE RISCO ────────────────────────────────────────
function abrirModalRisco(id) {
  const r = riscos.find(x => x.id === id);
  if (!r) return;

  const overlay = qs('#modal-overlay');
  const modal   = qs('#modal');

  modal.innerHTML = `
    <div class="modal-header">
      <div>
        <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-bottom:.5rem">
          <span class="tag ${tipoClass(r.tipo)}">${r.tipo}</span>
          <span class="tag ${grauClass(r.grau)}">Risco ${r.grau}</span>
          <span class="esocial-badge">⚡ ${r.esocial}</span>
        </div>
        <div class="modal-titulo" style="color:${r.cor}">${r.agente}</div>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Fechar">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-row">
        <div class="modal-field">
          <label>Setor</label>
          <p>${r.setor}</p>
        </div>
        <div class="modal-field">
          <label>Normativa</label>
          <p>${r.nr}</p>
        </div>
      </div>
      <div class="modal-field">
        <label>Fonte / Origem</label>
        <p>${r.fonte}</p>
      </div>
      <div class="modal-field">
        <label>Consequências à Saúde</label>
        <p>${r.consequencia}</p>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-pgr-pcmso">
        <div class="modal-pgr">
          <h4>PGR — Medidas de Controle</h4>
          <p>${r.pgr}</p>
        </div>
        <div class="modal-pcmso">
          <h4>PCMSO — Vigilância Médica</h4>
          <p>${r.pcmso}</p>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  qs('#modal-close-btn').addEventListener('click', fecharModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) fecharModal(); });
}

function fecharModal() {
  qs('#modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal();
});

// ── 4. PLANO DE AÇÃO ─────────────────────────────────────────
function statusLabel(s) {
  const map = {
    andamento: 'Em andamento',
    pendente:  'Pendente',
    concluido: 'Concluído',
    atrasado:  'Atrasado'
  };
  return map[s] || s;
}

function prioridadeStyle(p) {
  const map = {
    Critica: 'color:var(--red)',
    Alta:    'color:var(--yellow)',
    Media:   'color:var(--blue)',
    Baixa:   'color:var(--green)'
  };
  return map[p] || '';
}

function renderPlano() {
  const tbody = qs('#plano-tbody');
  if (!tbody) return;

  tbody.innerHTML = planoDeAcao.map(p => `
    <tr>
      <td data-label="ID"><code style="color:var(--muted);font-size:.75rem">${p.id}</code></td>
      <td data-label="O quê"><strong>${p.oque}</strong><br><span style="color:var(--muted);font-size:.78rem">${p.porque}</span></td>
      <td data-label="Quem">${p.quem}</td>
      <td data-label="Prazo">${p.quando}</td>
      <td data-label="Custo">${p.quanto}</td>
      <td data-label="Prioridade"><span style="${prioridadeStyle(p.prioridade)};font-weight:700;font-size:.82rem">▲ ${p.prioridade}</span></td>
      <td data-label="Status"><span class="status-badge status-${p.status}">${statusLabel(p.status)}</span></td>
    </tr>
  `).join('');
}

// ── 5. DOCUMENTOS ────────────────────────────────────────────
function renderDocumentos() {
  const container = qs('#docs-grid');
  if (!container) return;

  const renderCard = (tipo, icon, bgAccent) => {
    const d = documentos[tipo];
    return `
      <div class="doc-card" style="background:var(--surface)">
        <div class="doc-card-header" style="background:${bgAccent}">
          <div class="doc-card-icon">${icon}</div>
          <div class="doc-card-title">${d.titulo}</div>
          <div class="doc-card-desc">${d.descricao}</div>
        </div>
        <div class="doc-card-body">
          <ul class="doc-list">
            ${d.itens.map(i => `<li>${i}</li>`).join('')}
          </ul>
          <div class="doc-retencao">
            ⏱ <strong>Retenção:</strong> ${d.retencao}
          </div>
        </div>
      </div>
    `;
  };

  container.innerHTML =
    renderCard('fisico',  '🗄️', 'rgba(245,158,11,.05)') +
    renderCard('digital', '☁️', 'rgba(59,130,246,.05)');
}

// ── 6. INDICADORES ───────────────────────────────────────────
function renderIndicadores() {
  const container = qs('#indicadores-grid');
  if (!container) return;

  container.innerHTML = indicadores.map(ind => {
    const varClass = ind.variacao > 0 ? 'positivo' : 'negativo';
    const varSinal  = ind.variacao > 0 ? '+' : '';
    return `
      <div class="card indicador-card">
        <div class="indicador-nome">${ind.nome}</div>
        <div class="indicador-valor ind-${ind.status}">${ind.valor}</div>
        <div class="indicador-unidade">${ind.unidade}</div>
        <div class="indicador-meta">
          <span>Meta: ${ind.meta}</span>
          <span class="indicador-variacao ${varClass}">${varSinal}${ind.variacao} vs mês ant.</span>
        </div>
      </div>
    `;
  }).join('');
}

// ── 7. PDCA INTERATIVO ───────────────────────────────────────
function renderPDCA() {
  const container = qs('#pdca-detalhe');
  if (!container) return;

  // SVG da roda PDCA
  const rodaEl = qs('#pdca-roda');
  if (rodaEl) {
    rodaEl.innerHTML = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Quadrante P (topo esquerdo) -->
        <g class="pdca-setor" data-letra="P" role="button" tabindex="0" aria-label="P - Planejar">
          <path d="M100,100 L100,10 A90,90 0 0,0 10,100 Z" fill="#3b82f6" opacity="0.85"/>
          <text x="52" y="68" class="pdca-label" text-anchor="middle">P</text>
        </g>
        <!-- Quadrante D (topo direito) -->
        <g class="pdca-setor" data-letra="D" role="button" tabindex="0" aria-label="D - Executar">
          <path d="M100,100 L190,100 A90,90 0 0,0 100,10 Z" fill="#10b981" opacity="0.85"/>
          <text x="148" y="68" class="pdca-label" text-anchor="middle">D</text>
        </g>
        <!-- Quadrante C (baixo direito) -->
        <g class="pdca-setor" data-letra="C" role="button" tabindex="0" aria-label="C - Verificar">
          <path d="M100,100 L100,190 A90,90 0 0,0 190,100 Z" fill="#f59e0b" opacity="0.85"/>
          <text x="148" y="152" class="pdca-label" text-anchor="middle">C</text>
        </g>
        <!-- Quadrante A (baixo esquerdo) -->
        <g class="pdca-setor" data-letra="A" role="button" tabindex="0" aria-label="A - Agir">
          <path d="M100,100 L10,100 A90,90 0 0,0 100,190 Z" fill="#ef4444" opacity="0.85"/>
          <text x="52" y="152" class="pdca-label" text-anchor="middle">A</text>
        </g>
        <!-- Centro -->
        <circle cx="100" cy="100" r="22" fill="#13161d"/>
        <text x="100" y="105" text-anchor="middle" font-family="Syne,sans-serif" font-size="10" font-weight="800" fill="#e8eaf0">PDCA</text>
      </svg>
    `;
  }

  function mostrarLetra(letra) {
    const d = pdca[letra];
    container.innerHTML = `
      <div class="pdca-detalhe-letra" style="color:${d.cor}">${d.letra}</div>
      <div class="pdca-detalhe-titulo">${d.titulo}</div>
      <div class="pdca-detalhe-desc">${d.descricao}</div>
      <ul class="pdca-acoes">
        ${d.acoes.map(a => `<li style="--c:${d.cor}"><span style="color:${d.cor}">→</span> ${a}</li>`).join('')}
      </ul>
    `;

    // Highlight ativo
    qsa('.pdca-setor').forEach(s => {
      s.classList.toggle('ativo', s.dataset.letra === letra);
      s.querySelector('path').style.opacity = s.dataset.letra === letra ? '1' : '0.7';
    });
  }

  // Mostrar P por padrão
  mostrarLetra('P');

  // Eventos
  qsa('.pdca-setor').forEach(s => {
    const open = () => mostrarLetra(s.dataset.letra);
    s.addEventListener('click', open);
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

// ── 8. REFLEXÃO ──────────────────────────────────────────────
function renderReflexao() {
  const el = qs('#reflexao-texto');
  if (!el) return;

  const partes = reflexao.texto.split('\n    \n    ');
  el.innerHTML = partes.map(p => `<p>${p.trim().replace(/\n\s+/g, ' ')}</p>`).join('<br>');

  // Destacar última frase em negrito
  el.innerHTML = el.innerHTML.replace(
    'Burocracia sem diagnóstico é papel. Diagnóstico com ação é SST.',
    '<strong>Burocracia sem diagnóstico é papel. Diagnóstico com ação é SST.</strong>'
  );
}

// ── 9. BOTÃO IMPRIMIR ────────────────────────────────────────
function initPrint() {
  const btn = qs('#btn-print');
  if (btn) btn.addEventListener('click', () => window.print());
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderAlerts();
  renderHeroMeta();
  renderRiscos();
  renderPlano();
  renderDocumentos();
  renderIndicadores();
  renderPDCA();
  renderReflexao();
  initPrint();
});
