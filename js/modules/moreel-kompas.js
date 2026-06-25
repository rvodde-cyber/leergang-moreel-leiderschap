import { KOMPAS_STAPPEN, DILEMMA_PLACEHOLDER } from "../data/kompas.js";
import { DIMENSIES } from "../data/dimensies.js";
import { ARCHETYPEN } from "../data/archetypen.js";
import { saveDagboekEntry, saveKompasRun } from "../lib/storage.js";

export function renderMoreelKompas(container) {
  container.innerHTML = `
    <header class="module-header">
      <h2>Moreel Kompas</h2>
      <p class="lead">Werk een dilemma door in vijf stappen — van Zien tot Volhouden.</p>
    </header>

    <label class="dilemma-input">
      Jouw dilemma
      <textarea id="dilemma-context" rows="2" placeholder="${DILEMMA_PLACEHOLDER.context}"></textarea>
    </label>

    <form id="kompas-form" class="kompas-form">
      ${KOMPAS_STAPPEN.map((stap) => {
        const dim = DIMENSIES.find((d) => d.id === stap.dimensieId);
        return `
          <fieldset class="kompas-stap" style="--accent: ${dim?.kleur ?? "#333"}">
            <legend>${stap.stap} <span>(${stap.metafoor}) — ${dim?.fase}</span></legend>
            <p class="kernvraag">"${stap.kernvraag}"</p>
            <textarea name="${stap.dimensieId}" rows="3" placeholder="Jouw reflectie…"></textarea>
          </fieldset>`;
      }).join("")}
      <div class="kompas-actions">
        <button type="submit" class="btn btn-primary">Opslaan</button>
        <button type="button" id="kompas-to-dagboek" class="btn btn-ghost">Naar dagboek</button>
      </div>
    </form>

    <section id="kompas-result" class="kompas-result hidden" aria-live="polite"></section>
  `;

  const resultEl = container.querySelector("#kompas-result");
  const form = container.querySelector("#kompas-form");

  function showArchetypen(antwoorden) {
    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `
      <h3>Morele spiegel</h3>
      <p class="lead">Drie archetypen om je reflectie te verdiepen:</p>
      <div class="archetypen-grid">
        ${ARCHETYPEN.map(
          (a) => `
          <article class="archetype-card">
            <h4>${a.naam}</h4>
            <p class="thema">${a.thema}</p>
            <p class="vraag">${a.vraag}</p>
          </article>`
        ).join("")}
      </div>
    `;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const context = container.querySelector("#dilemma-context").value.trim();
    const antwoorden = {};
    KOMPAS_STAPPEN.forEach((s) => {
      antwoorden[s.dimensieId] = fd.get(s.dimensieId)?.toString().trim() ?? "";
    });
    saveKompasRun({ dilemma: context || DILEMMA_PLACEHOLDER.titel, antwoorden });
    showArchetypen(antwoorden);
  });

  container.querySelector("#kompas-to-dagboek").addEventListener("click", () => {
    const fd = new FormData(form);
    const velden = {};
    KOMPAS_STAPPEN.forEach((s) => {
      const v = fd.get(s.dimensieId)?.toString().trim();
      if (v) velden[s.dimensieId] = `[Kompas] ${v}`;
    });
    saveDagboekEntry({
      temperatuur: 5,
      velden,
      actieplan: "",
      bron: "kompas",
    });
    alert("Kompas-run opgeslagen in dagboek.");
  });
}
