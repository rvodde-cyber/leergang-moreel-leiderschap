/* Moreel Leiderschap — app logic (Claude-basis, Cursor-geoptimaliseerd) */

const CFG = window.ML_CONFIG || {};
const SUPABASE_URL = CFG.SUPABASE_URL || "";
const SUPABASE_KEY = CFG.SUPABASE_KEY || "";
const LAKMOESPROEF_URL = CFG.LAKMOESPROEF_URL || "https://organisatie-morele-lakmoestest.vercel.app/";

let sessieId = localStorage.getItem("ml_sessie_id");
if (!sessieId) {
  sessieId = crypto.randomUUID();
  localStorage.setItem("ml_sessie_id", sessieId);
}

let groepCode = localStorage.getItem("ml_groep_code") || "";
let actieveModelStap = null;
let kompasStap = 0;
let kompasAntwoorden = {};
let gekozenElement = "Hoofd";
let herkenbarePosts = JSON.parse(localStorage.getItem("ml_herkenbaar") || "[]");

const modelData = [
  { key: "hoofd", naam: "Kijken wordt Zien", verb: "Bewustwording", icon: "👁", kleur: "var(--c-hoofd)", licht: "var(--c-hoofd-light)", border: "var(--c-hoofd-border)", vraag: "Wat gebeurt hier echt?", body: "Het eerste moment van moreel vakmanschap is bewustwording — echt zien wat er speelt. Niet oppervlakkig kijken, maar doorgronden: wie zijn erbij betrokken, wat staat er op het spel, welke waarden en belangen spelen mee?", items: ["Moreel bewust worden", "Belangen en waarden herkennen", "Wat gebeurt hier echt?"] },
  { key: "buik", naam: "Voelen", verb: "Innerlijk kompas", icon: "◉", kleur: "var(--c-buik)", licht: "var(--c-buik-light)", border: "var(--c-buik-border)", vraag: "Waar krijg ik morele buikpijn van?", body: "Na het zien volgt het voelen — het innerlijk kompas dat signaleert dat er iets op het spel staat. Dit wee-gevoel serieus nemen is een vaardigheid op zichzelf.", items: ["Innerlijk kompas volgen", "Morele buikpijn herkennen", "Intuïtie serieus nemen"] },
  { key: "hart", naam: "Wegen", verb: "Morele afweging", icon: "◇", kleur: "var(--c-hart)", licht: "var(--c-hart-light)", border: "var(--c-hart-border)", vraag: "Wat botst hier allemaal?", body: "Wegen betekent doordenken wat er precies botst: waarden, regels, verantwoordelijkheden, belangen en context.", items: ["Waarden afwegen", "Loyaliteitsconflicten", "Wat botst hier allemaal?"] },
  { key: "handen", naam: "Handelen", verb: "Morele moed", icon: "◈", kleur: "var(--c-handen)", licht: "var(--c-handen-light)", border: "var(--c-handen-border)", vraag: "Wat vraagt dit van mij?", body: "Waarden worden pas geloofwaardig door zichtbaar gedrag. Handelen vraagt morele moed — ook als het ongemakkelijk is.", items: ["Morele moed tonen", "Moeilijk gesprek aangaan", "Durven staan voor wat juist is"] },
  { key: "ruggengraat", naam: "Volhouden", verb: "Integriteit & volharding", icon: "|", kleur: "var(--c-ruggengraat)", licht: "var(--c-ruggengraat-light)", border: "var(--c-ruggengraat-border)", vraag: "Welke koers wil ik blijven houden?", body: "Moreel vakmanschap is geen eenmalige keuze. Volhouden betekent koers houden in tijd en tegenslag.", items: ["Koers houden", "Integriteit als fundament", "Welke koers wil ik blijven houden?"] },
];

const dagdelen = [
  { num: 1, titel: "Zien en Voelen", subtitel: "Dagdeel 1 — Moreel bewustzijn", vraag: "Zie ik werkelijk wat er op het spel staat — en voel ik wanneer iets niet klopt?", themas: ["Wat is ethisch leiderschap?", "Morele blindheid", "Het innerlijke signaal"], pijlers: [{ key: "hoofd", label: "Hoofd", desc: "Herkennen, waarnemen" }, { key: "buik", label: "Buik", desc: "Wee-gevoel serieus nemen" }], werkvormen: "Praktijkdilemma's, morele spiegel, analyse van eigen casussen", app: "Dagelijkse vraag: Wat heb ik vandaag gezien dat moreel relevant was?" },
  { num: 2, titel: "Wegen en Handelen", subtitel: "Dagdeel 2 — Oordeelsvorming & moed", vraag: "Wat vraagt deze situatie van mij — en doe ik het ook als het spannend wordt?", themas: ["Waardenconflicten", "Morele moed", "Moeilijke gesprekken"], pijlers: [{ key: "hart", label: "Hart", desc: "Afwegen vanuit waarden" }, { key: "handen", label: "Handen", desc: "Daadwerkelijk handelen" }], werkvormen: "Moreel Kompas, rollenspelen, interventietraining", app: "Doorloop een dilemma met het Moreel Kompas" },
  { num: 3, titel: "Volhouden en Cultuur", subtitel: "Dagdeel 3 — Ruggegraat & ethische cultuur", vraag: "Hoe blijf ik trouw aan mijn waarden onder druk?", themas: ["Morele vermoeidheid", "Integriteit onder druk", "Ethische cultuur versterken"], pijlers: [{ key: "ruggengraat", label: "Ruggegraat", desc: "Volhouden, koers houden" }], werkvormen: "Morele autobiografie, kompasverklaring, cultuurdiagnose", app: "Facultatief: vul de Morele Lakmoesproef in — 21 stellingen over ethische cultuur in uw organisatie. Vraag collega's hetzelfde te doen.", appLink: { url: LAKMOESPROEF_URL, label: "Open Morele Lakmoesproef" } },
];

const dagCells = [
  { key: "hoofd", label: "Kijken wordt Zien", kleur: "var(--c-hoofd)", licht: "var(--c-hoofd-light)", placeholder: "Wat heb ik vandaag echt gezien?" },
  { key: "buik", label: "Voelen", kleur: "var(--c-buik)", licht: "var(--c-buik-light)", placeholder: "Waar kreeg ik morele buikpijn van?" },
  { key: "hart", label: "Wegen", kleur: "var(--c-hart)", licht: "var(--c-hart-light)", placeholder: "Wat botste er?" },
  { key: "handen", label: "Handelen", kleur: "var(--c-handen)", licht: "var(--c-handen-light)", placeholder: "Wat heb ik gedaan?" },
  { key: "ruggengraat", label: "Volhouden", kleur: "var(--c-ruggengraat)", licht: "var(--c-ruggengraat-light)", placeholder: "Welke koers heb ik gehouden?" },
];

const kompasStappen = [
  { num: 1, label: "Kijken wordt Zien", vraag: "Wat gebeurt hier echt? Beschrijf de situatie concreet." },
  { num: 2, label: "Voelen", vraag: "Waar krijg je morele buikpijn van? Wat signaleert jouw innerlijk kompas?" },
  { num: 3, label: "Wegen", vraag: "Wat botst hier allemaal? Welke waarden en belangen spelen een rol?" },
  { num: 4, label: "Handelen", vraag: "Wat vraagt dit van jou? Welke keuze maak je?" },
  { num: 5, label: "Volhouden", vraag: "Welke koers wil je blijven houden?" },
];

const archetypen = [
  { naam: "Odysseus", vraag: "Hoe houd je koers zonder jezelf te verliezen?", thema: "Verleiding, volharding", kleur: "var(--c-hoofd)", licht: "var(--c-hoofd-light)" },
  { naam: "Antigone", vraag: "Wat doe je wanneer het juiste je iets kost?", thema: "Loyaliteit, geweten", kleur: "var(--c-hart)", licht: "var(--c-hart-light)" },
  { naam: "Sisyphus", vraag: "Hoe blijf je trouw wanneer het zwaar voelt?", thema: "Volharding, zin", kleur: "var(--c-ruggengraat)", licht: "var(--c-ruggengraat-light)" },
];

const elementen = ["Hoofd", "Buik", "Hart", "Handen", "Ruggegraat"];
const elemKleuren = { Hoofd: "var(--c-hoofd)", Buik: "var(--c-buik)", Hart: "var(--c-hart)", Handen: "var(--c-handen)", Ruggegraat: "var(--c-ruggengraat)" };
const elemLichten = { Hoofd: "var(--c-hoofd-light)", Buik: "var(--c-buik-light)", Hart: "var(--c-hart-light)", Handen: "var(--c-handen-light)", Ruggegraat: "var(--c-ruggengraat-light)" };
const kleuren = { hoofd: "var(--c-hoofd)", buik: "var(--c-buik)", hart: "var(--c-hart)", handen: "var(--c-handen)", ruggengraat: "var(--c-ruggengraat)" };
const lichten = { hoofd: "var(--c-hoofd-light)", buik: "var(--c-buik-light)", hart: "var(--c-hart-light)", handen: "var(--c-handen-light)", ruggengraat: "var(--c-ruggengraat-light)" };
const GROEI_BAR_KLEUREN = ["var(--c-hoofd)", "var(--c-buik)", "var(--c-hart)", "var(--c-handen)", "var(--c-ruggengraat)"];
const BACKUP_VERSION = 1;

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function setButtonLoading(btn, loading, loadingText) {
  if (!btn) return;
  if (loading) {
    if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
    btn.textContent = loadingText || "Bezig…";
    btn.disabled = true;
    btn.classList.add("is-loading");
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
    btn.classList.remove("is-loading");
  }
}

function formatPostBody(element, tekst) {
  return `[${element}] ${tekst}`;
}

function normalizePost(p) {
  const rawBody = p.body ?? p.tekst ?? "";
  let element = p.element ?? "Hoofd";
  let body = rawBody;
  const tagMatch = rawBody.match(/^\[([^\]]+)\]\s*/);
  if (!p.element && tagMatch && elementen.includes(tagMatch[1])) {
    element = tagMatch[1];
    body = rawBody.slice(tagMatch[0].length);
  }
  return {
    id: p.id,
    body,
    element,
    herkenbaar_count: p.herkenbaar_count ?? 0,
  };
}

async function sbErrorMessage(r, fallback) {
  try {
    const err = await r.json();
    if (err?.message) return err.message;
    if (err?.hint) return `${fallback}: ${err.hint}`;
  } catch {
    /* ignore */
  }
  return fallback;
}

function getEntries() {
  return JSON.parse(localStorage.getItem("ml_dagboek") || "[]");
}

function showView(name, navEl) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  document.querySelectorAll(".nav-item[data-view]").forEach((i) => i.classList.remove("active"));
  const view = document.getElementById("view-" + name);
  if (view) view.classList.add("active");
  const nav = navEl || document.querySelector(`.nav-item[data-view="${name}"]`);
  if (nav) nav.classList.add("active");
  history.replaceState(null, "", "#" + name);
  if (name === "groep" && groepCode) laadPosts();
  if (name === "dagboek") renderEntries();
  if (name === "groei") renderGroei();
}

function slaGroepOp() {
  const input = document.getElementById("groep-code-input");
  groepCode = (input?.value || "").trim().toUpperCase();
  localStorage.setItem("ml_groep_code", groepCode);
  updateGroepDisplay();
  if (document.getElementById("view-groep")?.classList.contains("active")) laadPosts();
}

function updateGroepDisplay() {
  const el = document.getElementById("groep-code-display");
  if (el) el.textContent = groepCode || "—";
}

function renderModel() {
  const flow = document.getElementById("model-flow");
  if (!flow) return;
  flow.innerHTML = modelData
    .map(
      (m, i) => `
    <button type="button" class="model-step ${actieveModelStap === i ? "active" : ""}" data-idx="${i}"
      style="background:${actieveModelStap === i ? m.licht : "var(--surface)"}" aria-selected="${actieveModelStap === i}">
      <span class="model-step-num" style="color:${m.kleur}">${i + 1}</span>
      <span class="model-step-icon">${m.icon}</span>
      <span class="model-step-name" style="color:${actieveModelStap === i ? m.kleur : "var(--text)"}">${m.naam}</span>
      <span class="model-step-verb">${m.verb}</span>
    </button>`
    )
    .join("");
  flow.querySelectorAll(".model-step").forEach((btn) => {
    btn.addEventListener("click", () => selectModelStap(Number(btn.dataset.idx)));
  });
}

function selectModelStap(i) {
  actieveModelStap = i;
  renderModel();
  const m = modelData[i];
  document.getElementById("model-detail").innerHTML = `
    <div class="model-detail-title" style="color:${m.kleur}">${m.naam} — ${m.verb}</div>
    <p style="font-style:italic;font-size:13px;color:var(--muted);margin-bottom:.75rem">${m.vraag}</p>
    <div class="model-detail-body">${m.body}</div>
    <div class="model-detail-items">${m.items.map((it) => `<span class="model-tag" style="background:${m.licht};border:1px solid ${m.border};color:${m.kleur}">${it}</span>`).join("")}</div>`;
}

function renderProgramma() {
  const el = document.getElementById("dagdelen-list");
  if (!el) return;
  el.innerHTML = dagdelen
    .map(
      (d, i) => `
    <div class="dagdeel">
      <button type="button" class="dagdeel-header" data-idx="${i}" aria-expanded="${i === 0}">
        <div class="dagdeel-num">${d.num}</div>
        <div style="flex:1;text-align:left">
          <div class="dagdeel-title">${d.titel}</div>
          <div class="dagdeel-subtitle">${d.subtitel}</div>
        </div>
        <div class="dagdeel-chevron ${i === 0 ? "open" : ""}" id="chev-${i}">&#8964;</div>
      </button>
      <div class="dagdeel-body ${i === 0 ? "open" : ""}" id="body-${i}">
        <div class="dagdeel-vraag">${d.vraag}</div>
        <div class="section-label">Thema's</div>
        <div class="thema-list">${d.themas.map((t) => `<span class="thema-pill">${t}</span>`).join("")}</div>
        ${d.pijlers.length ? `<div class="section-label">Modelelementen</div><div class="pijler-grid">${d.pijlers.map((p) => `<div class="pijler-card" style="background:${lichten[p.key]}"><div class="pijler-label" style="color:${kleuren[p.key]}">${p.label}</div><div class="pijler-desc" style="color:${kleuren[p.key]}">${p.desc}</div></div>`).join("")}</div>` : ""}
        <div class="section-label">Werkvormen</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:1rem">${d.werkvormen}</p>
        <div class="app-hint">${d.app}</div>
        ${d.appLink ? `<p style="margin-top:.65rem"><a href="${esc(d.appLink.url)}" class="instrument-link" target="_blank" rel="noopener noreferrer">${esc(d.appLink.label)} ↗</a></p>` : ""}
      </div>
    </div>`
    )
    .join("");
  el.querySelectorAll(".dagdeel-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.idx;
      document.getElementById("body-" + i).classList.toggle("open");
      document.getElementById("chev-" + i).classList.toggle("open");
      btn.setAttribute("aria-expanded", document.getElementById("body-" + i).classList.contains("open"));
    });
  });
}

function renderDagGrid() {
  const grid = document.getElementById("dag-grid");
  if (!grid) return;
  grid.innerHTML = dagCells
    .map(
      (c) => `
    <div class="dag-cell" style="background:${c.licht};border-left-color:${c.kleur}">
      <div class="dag-cell-head"><div class="dag-dot" style="background:${c.kleur}"></div><div class="dag-cell-label" style="color:${c.kleur}">${c.label}</div></div>
      <textarea id="dag-${c.key}" rows="3" placeholder="${c.placeholder}"></textarea>
    </div>`
    )
    .join("");
}

function updateTemp() {
  const v = document.getElementById("temp-slider")?.value;
  const out = document.getElementById("temp-val");
  if (out && v) out.textContent = v;
}

function slaEntryOp() {
  const score = document.getElementById("temp-slider")?.value;
  const velden = {};
  dagCells.forEach((c) => {
    velden[c.key] = document.getElementById("dag-" + c.key)?.value.trim() || "";
  });
  if (!Object.values(velden).some(Boolean)) {
    toast("Vul ten minste één veld in.");
    return;
  }
  const entry = {
    datum: new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" }),
    score: parseInt(score, 10),
    velden,
  };
  const opgeslagen = getEntries();
  opgeslagen.unshift(entry);
  localStorage.setItem("ml_dagboek", JSON.stringify(opgeslagen));
  leegDagboek();
  renderEntries();
  toast("Entry opgeslagen.");
}

function leegDagboek() {
  dagCells.forEach((c) => {
    const el = document.getElementById("dag-" + c.key);
    if (el) el.value = "";
  });
  const sl = document.getElementById("temp-slider");
  if (sl) {
    sl.value = 5;
    updateTemp();
  }
}

function renderEntries() {
  const container = document.getElementById("entries-container");
  if (!container) return;
  const entries = getEntries();
  if (!entries.length) {
    container.innerHTML = '<p style="font-size:13px;color:var(--subtle)">Nog geen entries opgeslagen.</p>';
    return;
  }
  container.innerHTML = entries
    .map(
      (e) => `
    <article class="entry">
      <div class="entry-meta"><span class="entry-date">${esc(e.datum)}</span><span class="entry-score">Stevig: ${e.score}/10</span></div>
      <div class="entry-dims">${dagCells.filter((c) => e.velden?.[c.key]).map((c) => `<span class="entry-dim" style="background:${c.kleur}18;color:${c.kleur}">${c.label}</span>`).join("")}</div>
      ${dagCells.filter((c) => e.velden?.[c.key]).map((c) => `<div style="margin-top:.5rem"><span style="font-size:11px;color:var(--subtle);text-transform:uppercase">${c.label}</span><div class="entry-preview">${esc(e.velden[c.key])}</div></div>`).join("")}
    </article>`
    )
    .join("");
}

function renderGroei() {
  const el = document.getElementById("groei-content");
  if (!el) return;
  const entries = getEntries();
  const kompasCount = JSON.parse(localStorage.getItem("ml_kompas_count") || "0");
  const avg = entries.length ? (entries.reduce((s, e) => s + (e.score || 0), 0) / entries.length).toFixed(1) : "—";
  const first = entries.length ? entries[entries.length - 1].score : null;
  const last = entries.length ? entries[0].score : null;
  const recent = entries.slice(0, 10).reverse();
  const maxScore = 10;

  el.innerHTML = `
    <div class="groei-stats">
      <div class="groei-stat"><div class="groei-stat-val">${entries.length}</div><div class="groei-stat-label">Dagboekentries</div></div>
      <div class="groei-stat"><div class="groei-stat-val">${avg}</div><div class="groei-stat-label">Gem. temperatuur</div></div>
      <div class="groei-stat"><div class="groei-stat-val">${first != null && last != null ? (last >= first ? "+" : "") + (last - first) : "—"}</div><div class="groei-stat-label">Verschil begin ↔ nu</div></div>
    </div>
    ${recent.length ? `<div class="section-label">Morele temperatuur (laatste ${recent.length})</div>
    <div class="groei-chart">${recent.map((e, i) => `<div class="groei-bar-wrap"><div class="groei-bar" style="height:${(e.score / maxScore) * 100}%;background:${GROEI_BAR_KLEUREN[i % GROEI_BAR_KLEUREN.length]}" title="${e.score}/10"></div><span class="groei-bar-label">${i + 1}</span></div>`).join("")}</div>` : '<p class="loading-msg">Schrijf dagboekentries om je groei te zien.</p>'}
    <p style="font-size:12px;color:var(--subtle);margin-top:1rem">Kompas-sessies opgeslagen: ${kompasCount}</p>`;
}

function renderKompas() {
  const stepsEl = document.getElementById("kompas-steps");
  if (!stepsEl) return;
  stepsEl.innerHTML = kompasStappen
    .map(
      (s, i) => `
    ${i > 0 ? '<div class="k-line"></div>' : ""}
    <div class="k-step"><div class="k-dot ${i < kompasStap ? "done" : i === kompasStap ? "active" : ""}">${i < kompasStap ? "✓" : s.num}</div><div class="k-label">${s.label}</div></div>`
    )
    .join("");

  const s = kompasStappen[kompasStap];
  document.getElementById("kompas-content").innerHTML = `<div class="kompas-q">${s.vraag}</div><textarea class="kompas-textarea" id="kompas-input" rows="4"></textarea>`;
  document.getElementById("kompas-input").value = kompasAntwoorden[kompasStap] || "";

  document.getElementById("kompas-nav").innerHTML = `
    ${kompasStap > 0 ? '<button type="button" class="btn" id="kompas-back">Terug</button>' : ""}
    ${kompasStap < kompasStappen.length - 1 ? '<button type="button" class="btn btn-primary" id="kompas-next">Volgende stap</button>' : '<button type="button" class="btn btn-primary" id="kompas-done">Afronden</button>'}`;

  document.getElementById("kompas-back")?.addEventListener("click", kompasTerug);
  document.getElementById("kompas-next")?.addEventListener("click", kompasVervolgStap);
  document.getElementById("kompas-done")?.addEventListener("click", kompasAfronden);
  document.getElementById("kompas-result").innerHTML = "";
}

function kompasVervolgStap() {
  const val = document.getElementById("kompas-input")?.value.trim();
  if (!val) { toast("Vul dit veld in."); return; }
  kompasAntwoorden[kompasStap] = val;
  kompasStap++;
  renderKompas();
}

function kompasTerug() {
  kompasAntwoorden[kompasStap] = document.getElementById("kompas-input")?.value.trim() || "";
  kompasStap--;
  renderKompas();
}

function kompasAfronden() {
  const val = document.getElementById("kompas-input")?.value.trim();
  if (!val) { toast("Vul dit veld in."); return; }
  kompasAntwoorden[kompasStap] = val;
  const labels = kompasStappen.map((s) => s.label);
  const keys = ["hoofd", "buik", "hart", "handen", "ruggengraat"];
  document.getElementById("kompas-result").innerHTML = `
    <div class="result-block">
      <h3>Jouw moreel kompas</h3>
      ${Object.keys(kompasAntwoorden).map((k) => `<div class="result-line"><div class="result-step-label">${labels[k]}</div><div style="flex:1">${esc(kompasAntwoorden[k])}</div></div>`).join("")}
      <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border)">
        <div class="section-label">Morele spiegel — herkent u uzelf?</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:.75rem">
          ${archetypen.map((a) => `<div style="background:${a.licht};border-radius:var(--radius);padding:.9rem;border:1px solid ${a.kleur}30"><strong style="color:${a.kleur}">${a.naam}</strong><p style="font-style:italic;font-size:12px;margin:.35rem 0">"${a.vraag}"</p><span style="font-size:11px;color:var(--muted)">${a.thema}</span></div>`).join("")}
        </div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="kompas-save">Opslaan in dagboek</button>
        <button type="button" class="btn" id="kompas-new">Nieuw dilemma</button>
      </div>
    </div>`;
  document.getElementById("kompas-save")?.addEventListener("click", slaKompasOpInDagboek);
  document.getElementById("kompas-new")?.addEventListener("click", kompasNieuw);
}

function slaKompasOpInDagboek() {
  const keys = ["hoofd", "buik", "hart", "handen", "ruggengraat"];
  const velden = {};
  keys.forEach((k, i) => {
    if (kompasAntwoorden[i]) velden[k] = kompasAntwoorden[i];
  });
  const opgeslagen = getEntries();
  opgeslagen.unshift({
    datum: new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" }),
    score: 5,
    velden,
    bron: "kompas",
  });
  localStorage.setItem("ml_dagboek", JSON.stringify(opgeslagen));
  localStorage.setItem("ml_kompas_count", String(Number(localStorage.getItem("ml_kompas_count") || 0) + 1));
  toast("Opgeslagen in dagboek.");
}

function kompasNieuw() {
  kompasStap = 0;
  kompasAntwoorden = {};
  renderKompas();
}

async function sbGet(table, filter) {
  const params = new URLSearchParams({ ...filter, order: "created_at.desc", limit: "30" });
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY },
  });
  if (!r.ok) throw new Error(await sbErrorMessage(r, "Kon posts niet laden"));
  return r.json();
}

async function sbInsert(table, data) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await sbErrorMessage(r, "Kon niet opslaan"));
  return r.json();
}

async function sbDelete(table, filter) {
  const params = new URLSearchParams(filter);
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    method: "DELETE",
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY },
  });
  if (!r.ok) throw new Error(await sbErrorMessage(r, "Kon niet verwijderen"));
  return r;
}

function renderElemSelect() {
  const el = document.getElementById("elem-select");
  if (!el) return;
  el.innerHTML = elementen
    .map(
      (e) => `<button type="button" class="elem-btn ${e === gekozenElement ? "selected" : ""}" data-el="${e}" style="${e === gekozenElement ? `background:${elemLichten[e]};border-color:${elemKleuren[e]};color:${elemKleuren[e]}` : ""}">${e}</button>`
    )
    .join("");
  el.querySelectorAll(".elem-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      gekozenElement = btn.dataset.el;
      renderElemSelect();
    });
  });
}

async function plaatsPost() {
  const tekst = document.getElementById("post-tekst")?.value.trim();
  if (!tekst) { toast("Schrijf eerst een ervaring."); return; }
  if (!groepCode) { toast("Vul een groepscode in."); return; }
  if (!SUPABASE_KEY) { toast("Supabase niet geconfigureerd (js/config.js)."); return; }
  const btn = document.getElementById("btn-plaats-post");
  setButtonLoading(btn, true, "Plaatsen…");
  try {
    await sbInsert("ml_posts", {
      group_code: groepCode,
      body: formatPostBody(gekozenElement, tekst),
    });
    document.getElementById("post-tekst").value = "";
    toast("Geplaatst.");
    await laadPosts();
  } catch (e) {
    toast(e.message);
  }
  setButtonLoading(btn, false);
}

async function laadPosts() {
  const container = document.getElementById("posts-container");
  if (!container) return;
  if (!groepCode) {
    container.innerHTML = '<div class="loading-msg">Voer een groepscode in.</div>';
    return;
  }
  if (!SUPABASE_KEY) {
    container.innerHTML = '<div class="loading-msg">Supabase-key ontbreekt in js/config.js</div>';
    return;
  }
  container.innerHTML = '<div class="loading-msg is-active">Laden…</div>';
  try {
    const rawPosts = await sbGet("ml_posts", { group_code: "eq." + groepCode });
    const posts = rawPosts.map(normalizePost);
    const avatars = ["◇", "△", "○", "□", "◈"];
    container.innerHTML = posts.length
      ? posts
          .map(
            (p, i) => `
        <article class="post-card">
          <div class="post-meta"><div class="post-avatar">${avatars[i % avatars.length]}</div><span class="post-anon">Deelnemer · anoniem</span>
          <span class="post-elem" style="background:${elemLichten[p.element] || "var(--surface-muted)"};color:${elemKleuren[p.element] || "var(--muted)"}">${esc(p.element)}</span></div>
          <div class="post-text">${esc(p.body)}</div>
          <button type="button" class="post-herk ${herkenbarePosts.includes(p.id) ? "active" : ""}" data-id="${p.id}">Herkenbaar${p.herkenbaar_count > 0 ? " · " + p.herkenbaar_count : ""}</button>
        </article>`
          )
          .join("")
      : '<div class="loading-msg">Nog geen ervaringen in deze groep.</div>';
    container.querySelectorAll(".post-herk").forEach((btn) => {
      btn.addEventListener("click", () => toggleHerkenbaar(btn.dataset.id, btn));
    });
  } catch (e) {
    container.innerHTML = `<div class="loading-msg">${esc(e.message)}</div>`;
  }
}

async function toggleHerkenbaar(postId, btn) {
  const was = herkenbarePosts.includes(postId);
  if (btn) setButtonLoading(btn, true, "…");
  try {
    if (was) {
      herkenbarePosts = herkenbarePosts.filter((id) => id !== postId);
      await sbDelete("ml_herkenbaar", { post_id: "eq." + postId, sessie_id: "eq." + sessieId });
    } else {
      herkenbarePosts.push(postId);
      await sbInsert("ml_herkenbaar", { post_id: postId, sessie_id: sessieId });
    }
    localStorage.setItem("ml_herkenbaar", JSON.stringify(herkenbarePosts));
    await laadPosts();
  } catch (e) {
    if (was) herkenbarePosts.push(postId);
    else herkenbarePosts = herkenbarePosts.filter((id) => id !== postId);
    toast(e.message);
    if (btn) setButtonLoading(btn, false);
  }
}

function exportDagboek() {
  const payload = {
    version: BACKUP_VERSION,
    app: "moreel-leiderschap",
    exportedAt: new Date().toISOString(),
    entries: getEntries(),
    kompasCount: Number(localStorage.getItem("ml_kompas_count") || 0),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moreel-leiderschap-dagboek-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("Backup gedownload.");
}

function importDagboekFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const entries = Array.isArray(data) ? data : data.entries;
      if (!Array.isArray(entries)) throw new Error("Geen geldige entries gevonden.");
      const huidig = getEntries();
      const bevestig = huidig.length
        ? confirm(`Je hebt ${huidig.length} entries. Importeren voegt ${entries.length} entries toe bovenaan. Doorgaan?`)
        : true;
      if (!bevestig) return;
      localStorage.setItem("ml_dagboek", JSON.stringify([...entries, ...huidig]));
      if (data.kompasCount != null) {
        localStorage.setItem("ml_kompas_count", String(data.kompasCount));
      }
      renderEntries();
      if (document.getElementById("view-groei")?.classList.contains("active")) renderGroei();
      toast(`${entries.length} entries geïmporteerd.`);
    } catch (e) {
      toast(e.message || "Import mislukt — controleer het bestand.");
    }
  };
  reader.readAsText(file);
}

function printDagboek() {
  showView("dagboek", document.querySelector('.nav-item[data-view="dagboek"]'));
  setTimeout(() => window.print(), 150);
}

const WHEEL_STEPS = [
  { idx: 0, num: 1, label: "Zien", fill: "#185FA5", stroke: "#185FA5", text: "#ffffff" },
  { idx: 1, num: 2, label: "Voelen", fill: "#FFF8F0", stroke: "#854F0B", text: "#854F0B" },
  { idx: 2, num: 3, label: "Wegen", fill: "#FBEAF0", stroke: "#993556", text: "#993556" },
  { idx: 3, num: 4, label: "Handelen", fill: "#E1F5EE", stroke: "#0F6E56", text: "#0F6E56" },
  { idx: 4, num: 5, label: "Volhouden", fill: "#FAEEDA", stroke: "#993C1D", text: "#993C1D" },
];

function wheelNodePos(i, cx, cy, r) {
  const rad = ((-90 + i * 72) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function renderWelcomeWheel() {
  const slot = document.getElementById("welcome-model-wheel");
  if (!slot) return;

  const cx = 180;
  const cy = 180;
  const orbit = 112;
  const nodeR = 32;
  const starColors = ["#993C1D", "#6B4C9A", "#0F6E56", "#993556", "#854F0B"];

  const starTris = starColors
    .map((color, i) => {
      const a = ((-90 + i * 72) * Math.PI) / 180;
      const x1 = cx + 58 * Math.cos(a);
      const y1 = cy + 58 * Math.sin(a);
      const x2 = cx + 38 * Math.cos(a + 0.45);
      const y2 = cy + 38 * Math.sin(a + 0.45);
      const x3 = cx + 38 * Math.cos(a - 0.45);
      const y3 = cy + 38 * Math.sin(a - 0.45);
      return `<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="${color}" opacity=".85"/>`;
    })
    .join("");

  const dashedLines = WHEEL_STEPS.map((_, i) => {
    const p = wheelNodePos(i, cx, cy, orbit);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#d5cfc6" stroke-width="1" stroke-dasharray="4 4"/>`;
  }).join("");

  const arrows = WHEEL_STEPS.map((_, i) => {
    const a1 = ((-90 + i * 72 + 18) * Math.PI) / 180;
    const a2 = ((-90 + (i + 1) * 72 - 18) * Math.PI) / 180;
    const r = orbit + 8;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    return `<path d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="#c4bdb2" stroke-width="3" marker-end="url(#wheel-arrow)"/>`;
  }).join("");

  const nodes = WHEEL_STEPS.map((step) => {
    const p = wheelNodePos(step.idx, cx, cy, orbit);
    const solid = step.fill === step.stroke;
    return `
      <g class="wheel-step" data-idx="${step.idx}" role="button" tabindex="0" aria-label="${step.num} ${step.label}">
        <circle cx="${p.x}" cy="${p.y}" r="${nodeR}" fill="${step.fill}" stroke="${step.stroke}" stroke-width="${solid ? 0 : 2.5}"/>
        <text x="${p.x}" y="${p.y - 5}" text-anchor="middle" fill="${step.text}" font-family="DM Sans, system-ui, sans-serif" font-size="13" font-weight="600">${step.num}</text>
        <text x="${p.x}" y="${p.y + 12}" text-anchor="middle" fill="${step.text}" font-family="DM Sans, system-ui, sans-serif" font-size="11" font-weight="500">${step.label}</text>
      </g>`;
  }).join("");

  slot.innerHTML = `
    <svg viewBox="0 0 360 360" role="img" aria-labelledby="wheel-title wheel-desc">
      <title id="wheel-title">Moreel Vakmanschap-model</title>
      <desc id="wheel-desc">Vijf stappen — Zien, Voelen, Wegen, Handelen, Volhouden — rond de kern met gesprekskaarten</desc>
      <defs>
        <marker id="wheel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#c4bdb2"/>
        </marker>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${orbit + 14}" fill="none" stroke="#e0dbd2" stroke-width="1"/>
      ${starTris}
      ${dashedLines}
      ${arrows}
      <g class="wheel-kern" role="button" tabindex="0" aria-label="Kern — gesprekskaarten">
        <circle cx="${cx}" cy="${cy}" r="46" fill="#F3EEFC" stroke="#6B4C9A" stroke-width="3"/>
        <text x="${cx}" y="${cy - 14}" text-anchor="middle" fill="#185FA5" font-family="DM Sans, system-ui, sans-serif" font-size="15" font-weight="700">KERN</text>
        <text x="${cx}" y="${cy + 2}" text-anchor="middle" fill="#185FA5" font-family="DM Sans, system-ui, sans-serif" font-size="9.5" font-weight="500">Gesprekskaarten</text>
        <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="#185FA5" font-family="DM Sans, system-ui, sans-serif" font-size="7.5" font-weight="400">Morele situaties</text>
        <text x="${cx}" y="${cy + 24}" text-anchor="middle" fill="#185FA5" font-family="DM Sans, system-ui, sans-serif" font-size="7.5" font-weight="400">uit de praktijk</text>
      </g>
      ${nodes}
    </svg>`;

  slot.querySelectorAll(".wheel-step, .wheel-kern").forEach((el) => {
    const go = () => {
      const idx = el.classList.contains("wheel-kern") ? 0 : Number(el.dataset.idx);
      actieveModelStap = idx;
      showView("model", document.querySelector('.nav-item[data-view="model"]'));
      selectModelStap(idx);
    };
    el.addEventListener("click", go);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });
}

function init() {
  const codeInput = document.getElementById("groep-code-input");
  if (codeInput) {
    codeInput.value = groepCode;
    codeInput.addEventListener("input", slaGroepOp);
    codeInput.addEventListener("change", slaGroepOp);
    codeInput.addEventListener("blur", slaGroepOp);
  }

  document.querySelectorAll(".nav-item[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.view, btn));
  });

  document.getElementById("temp-slider")?.addEventListener("input", updateTemp);
  document.getElementById("btn-save-entry")?.addEventListener("click", slaEntryOp);
  document.getElementById("btn-clear-entry")?.addEventListener("click", leegDagboek);
  document.getElementById("btn-plaats-post")?.addEventListener("click", plaatsPost);
  document.getElementById("btn-export-dagboek")?.addEventListener("click", exportDagboek);
  document.getElementById("btn-import-dagboek")?.addEventListener("click", () => {
    document.getElementById("import-dagboek-file")?.click();
  });
  document.getElementById("import-dagboek-file")?.addEventListener("change", (e) => {
    importDagboekFromFile(e.target.files?.[0]);
    e.target.value = "";
  });
  document.getElementById("btn-print-dagboek")?.addEventListener("click", printDagboek);

  renderModel();
  selectModelStap(0);
  renderProgramma();
  renderDagGrid();
  renderEntries();
  renderKompas();
  renderElemSelect();
  updateGroepDisplay();
  renderWelcomeWheel();

  document.getElementById("btn-welcome-start")?.addEventListener("click", () => {
    showView("model", document.querySelector('.nav-item[data-view="model"]'));
  });
  document.getElementById("btn-welcome-programma")?.addEventListener("click", () => {
    showView("programma", document.querySelector('.nav-item[data-view="programma"]'));
  });

  const hash = location.hash.replace("#", "");
  const valid = ["welkom", "model", "programma", "terugkom", "dagboek", "dilemma", "groei", "groep"];
  showView(valid.includes(hash) ? hash : "welkom");
}

document.addEventListener("DOMContentLoaded", init);
