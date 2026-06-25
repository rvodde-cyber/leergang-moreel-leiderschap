import { DIMENSIES } from "../data/dimensies.js";
import { saveDagboekEntry, loadDagboekEntries } from "../lib/storage.js";

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderEntries(listEl) {
  const entries = loadDagboekEntries();
  if (!entries.length) {
    listEl.innerHTML = `<p class="empty">Nog geen dagboeknotities.</p>`;
    return;
  }

  listEl.innerHTML = entries
    .map((e) => {
      const velden = DIMENSIES.map((d) => {
        const tekst = e.velden?.[d.id];
        if (!tekst) return "";
        return `<p><strong>${d.stap}:</strong> ${escapeHtml(tekst)}</p>`;
      }).join("");

      return `
        <article class="dagboek-entry">
          <div class="entry-meta">
            <span class="temp" title="Morele temperatuur (1–10)">${e.temperatuur ?? "—"}/10</span>
            <time>${new Date(e.createdAt).toLocaleDateString("nl-NL")}</time>
          </div>
          ${velden}
          ${e.actieplan ? `<div class="actieplan-snippet"><strong>Actieplan:</strong> ${escapeHtml(e.actieplan)}</div>` : ""}
        </article>`;
    })
    .join("");
}

export function renderDagboek(container) {
  container.innerHTML = `
    <header class="module-header">
      <h2>Mijn dagboek</h2>
      <p class="lead">Dagelijks ~3 minuten — vijf velden, één per stap. Privé op dit apparaat.</p>
    </header>

    <form id="dagboek-form" class="dagboek-form">
      <label class="temp-label">
        Morele temperatuur (1–10)
        <input type="range" name="temperatuur" min="1" max="10" value="5" />
        <output id="temp-out">5</output>
      </label>

      ${DIMENSIES.map(
        (d) => `
        <fieldset class="dagboek-veld" style="--accent: ${d.kleur}">
          <legend>${d.stap} <span>(${d.metafoor})</span></legend>
          <textarea name="${d.id}" rows="2" placeholder="${d.dagboekPrompt}"></textarea>
        </fieldset>`
      ).join("")}

      <details class="actieplan-veld">
        <summary>Actieplan (terugkomdag)</summary>
        <textarea name="actieplan" rows="3" placeholder="Waar sta ik voor? Waar ga ik voor? Wat bescherm ik? Wat houd ik vol?"></textarea>
      </details>

      <button type="submit" class="btn btn-primary">Bewaren</button>
    </form>

    <section class="dagboek-lijst" aria-label="Eerdere notities">
      <h3>Eerdere notities</h3>
      <div id="dagboek-entries"></div>
    </section>
  `;

  const range = container.querySelector('input[name="temperatuur"]');
  const out = container.querySelector("#temp-out");
  range.addEventListener("input", () => {
    out.textContent = range.value;
  });

  const listEl = container.querySelector("#dagboek-entries");
  renderEntries(listEl);

  container.querySelector("#dagboek-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const velden = {};
    DIMENSIES.forEach((d) => {
      const v = fd.get(d.id)?.toString().trim();
      if (v) velden[d.id] = v;
    });

    saveDagboekEntry({
      temperatuur: Number(fd.get("temperatuur")),
      velden,
      actieplan: fd.get("actieplan")?.toString().trim() || "",
    });
    e.target.reset();
    out.textContent = "5";
    renderEntries(listEl);
  });
}
