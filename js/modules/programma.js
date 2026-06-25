import { DIMENSIES } from "../data/dimensies.js";
import { DAGDELEN, TERUGKOMDAG } from "../data/programma.js";

function dimLabels(ids) {
  return ids
    .map((id) => DIMENSIES.find((d) => d.id === id))
    .filter(Boolean)
    .map((d) => `<span class="dim-pill" style="--accent:${d.kleur}">${d.stap}</span>`)
    .join("");
}

export function renderProgramma(container) {
  container.innerHTML = `
    <header class="module-header">
      <h2>Programma</h2>
      <p class="lead">Drie dagdelen + terugkomdag — voor leidinggevenden in zorg, onderwijs, overheid en bedrijfsleven.</p>
    </header>

    <section class="dagdelen-list">
      ${DAGDELEN.map(
        (d) => `
        <details class="dagdeel-card" open>
          <summary>
            <span class="dagdeel-num">Dagdeel ${d.nummer}</span>
            <strong>${d.titel}</strong>
          </summary>
          <div class="dagdeel-body">
            <p class="centrale-vraag">${d.centraleVraag}</p>
            <div class="dim-pills">${dimLabels(d.dimensies)}</div>
            <ul class="themas">${d.themas.map((t) => `<li>${t}</li>`).join("")}</ul>
            <p class="app-opdracht"><strong>App:</strong> ${d.appOpdracht}</p>
          </div>
        </details>`
      ).join("")}
    </section>

    <section class="terugkomdag-card">
      <h3>${TERUGKOMDAG.titel}</h3>
      <p class="meta">${TERUGKOMDAG.timing}</p>
      <p class="centrale-vraag">${TERUGKOMDAG.centraleVraag}</p>
      <ul>${TERUGKOMDAG.agenda.map((a) => `<li>${a}</li>`).join("")}</ul>
      <div class="actieplan">
        <h4>Persoonlijk actieplan</h4>
        <ol>
          ${TERUGKOMDAG.actieplanVragen.map((v) => `<li>${v}</li>`).join("")}
        </ol>
      </div>
      <p class="app-opdracht"><strong>App:</strong> ${TERUGKOMDAG.appOpdracht}</p>
    </section>
  `;
}
