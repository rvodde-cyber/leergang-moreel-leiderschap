import { DIMENSIES, KERNZIN } from "../data/dimensies.js";
import { QUOTES } from "../data/quotes.js";

export function renderModel(container) {
  container.innerHTML = `
    <header class="module-header">
      <h2>Het model</h2>
      <p class="lead kernzin">${KERNZIN}</p>
    </header>

    <div class="model-stream" role="list" aria-label="Vijf stappen Moreel Vakmanschap">
      ${DIMENSIES.map(
        (d, i) => `
        <article class="model-step" style="--accent: ${d.kleur}" role="listitem">
          <span class="model-step-num">${i + 1}</span>
          <div class="model-step-body">
            <div class="model-step-head">
              <strong>${d.stap}</strong>
              <span class="metafoor">${d.metafoor}</span>
              <span class="fase">${d.fase}</span>
            </div>
            <p class="kernvraag">"${d.kernvraag}"</p>
            <p class="beschrijving">${d.beschrijving}</p>
          </div>
        </article>
        ${i < DIMENSIES.length - 1 ? '<span class="model-arrow" aria-hidden="true">→</span>' : ""}`
      ).join("")}
    </div>

    <section class="quotes-section" aria-label="Stemmen uit het veld">
      <h3>Stemmen uit het veld</h3>
      <div class="quotes-grid">
        ${QUOTES.map(
          (q) => `
          <blockquote class="quote-card">
            <p>${q.tekst}</p>
          </blockquote>`
        ).join("")}
      </div>
    </section>
  `;
}
