import { loadDagboekEntries, loadKompasHistory } from "../lib/storage.js";

export function renderDashboard(container) {
  const dagboek = loadDagboekEntries();
  const kompas = loadKompasHistory();
  const avgTemp =
    dagboek.length > 0
      ? (dagboek.reduce((s, e) => s + (e.temperatuur ?? 0), 0) / dagboek.length).toFixed(1)
      : "—";

  container.innerHTML = `
    <header class="module-header">
      <h2>Groei-dashboard</h2>
      <p class="lead">Overzicht van je lokale voortgang — uitgebreid na Claude-import.</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">${dagboek.length}</span>
        <span class="stat-label">Dagboeknotities</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${kompas.length}</span>
        <span class="stat-label">Kompas-runs</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${avgTemp}</span>
        <span class="stat-label">Gem. temperatuur</span>
      </div>
    </div>

    <p class="placeholder-note">Grafieken en zelfscan komen na import van Claude-specificatie.</p>
  `;
}
