const SCALE_LABELS = [
  "Dit herken ik nauwelijks in mezelf",
  "Soms, maar niet consistent",
  "Regelmatig, maar ik twijfel",
  "Meestal wel",
  "Dit is wie ik ben",
];

const DIMENSIONS = [
  {
    id: "hoofd",
    step: 1,
    label: "Hoofd",
    subtitle: "Waarnemen & redeneren",
    heroClass: "hero-hoofd",
    image: "beelden/beeld-hoofd.jpg",
    intro:
      "Het hoofd ziet het eerst. Ethisch leiderschap begint bij waarnemen — het vermogen om te herkennen wanneer een situatie moreel op het spel staat. Niet iedereen ziet het. Zie jij het?",
    statements: [
      "Ik herken het wanneer een situatie een ethische dimensie heeft — ook als anderen dat niet benoemen.",
      "Ik denk na over de belangen van alle betrokkenen voordat ik een beslissing neem.",
      "Ik durf hardop te benoemen wanneer iets mij ethisch niet klopt, ook als dat ongemakkelijk is.",
      "Ik maak beslissingen op basis van principes en rechtvaardigheid, niet alleen op basis van wat praktisch is.",
    ],
    reflectie: "Denk aan een recente situatie op het werk. Zag jij de ethische dimensie — en zo ja, op welk moment?",
    lowNote:
      "Moreel bewustzijn groeit. De vraag is niet of je alles ziet — maar of je leert kijken wanneer anderen wegkijken.",
  },
  {
    id: "buik",
    step: 2,
    label: "Buik",
    subtitle: "Het niet-pluisgevoel",
    heroClass: "hero-buik",
    image: "beelden/beeld-buik.jpg",
    intro:
      "Soms weet je het al voordat je het kunt redeneren. Een onrust. Een knoop. Iets klopt niet — maar je kunt het nog niet benoemen. Ethische leiders leren dit gevoel te vertrouwen, niet weg te redeneren.",
    statements: [
      "Ik neem mijn gevoel van onbehagen serieus als signaal dat er iets niet klopt.",
      "Als ik twijfel of iets goed is, onderzoek ik die twijfel — ik redeneer hem niet weg.",
      "Ik herken het verschil tussen ongemak door iets nieuws en ongemak door iets wat niet klopt.",
      "Ik laat mijn intuïtie meetellen in mijn oordeel, naast feiten en argumenten.",
    ],
    reflectie: "Wanneer heb jij voor het laatst een knoop in je maag genegeerd? Wat gebeurde er daarna?",
    lowNote:
      "Twijfel is geen zwakte. Het is informatie — als je bereid bent om te luisteren.",
  },
  {
    id: "hart",
    step: 3,
    label: "Hart",
    subtitle: "Afwegen & verbinden",
    heroClass: "hero-hart",
    image: "beelden/beeld-hart.jpg",
    intro:
      "Het hart weegt. Het verbindt de situatie met wat je werkelijk belangrijk vindt — voor de mensen om je heen, voor jezelf. Empathie is geen zachte vaardigheid. Het is de basis van moreel oordelen.",
    statements: [
      "Ik toon oprechte interesse in het welzijn van de mensen in mijn team — ook als het druk is.",
      "Ik probeer de situatie te begrijpen vanuit het perspectief van de ander, ook als ik het er niet mee eens ben.",
      "Ik ben eerlijk en betrouwbaar — ik doe wat ik zeg, ook als het me iets kost.",
      "Ik zorg voor een veilige omgeving waarin mensen zich kunnen uitspreken over wat hen bezighoudt.",
    ],
    reflectie: "Aan wie in jouw team besteed jij het minste aandacht? Waarom eigenlijk?",
    lowNote:
      "Verbinden vraagt tijd. De vraag is niet of je het kunt — maar of je ruimte maakt.",
  },
  {
    id: "handen",
    step: 4,
    label: "Handen",
    subtitle: "Het juiste doen",
    heroClass: "hero-handen",
    image: "beelden/beeld-handen.jpg",
    intro:
      "Waarden worden pas geloofwaardig door wat je doet. Niet in een vergadering, niet in een beleidsstuk — maar in de kleine momenten, elke dag. Ben jij dezelfde persoon aan de vergadertafel als in de kantine?",
    statements: [
      "Mijn gedrag is consistent — ik handel naar mijn waarden, ook als niemand kijkt.",
      "Ik spreek mensen aan op gedrag dat niet klopt, ook als dat ongemakkelijk is of politiek gevoelig ligt.",
      "Ik geef anderen de ruimte en autonomie om te groeien, ook als dat betekent dat ik loslaat.",
      "Ik stimuleer en beloon ethisch gedrag in mijn team — niet alleen goede resultaten.",
    ],
    reflectie: "Noem één moment waarop jouw gedrag niet overeenkwam met je waarden. Wat maakte dat zo moeilijk?",
    lowNote:
      "Morele moed groeit in kleine momenten — niet alleen in grote beslissingen.",
  },
  {
    id: "ruggengraat",
    step: 5,
    label: "Ruggegraat",
    subtitle: "Koers houden onder druk",
    heroClass: "hero-ruggegraat",
    image: "beelden/beeld-ruggegraat.jpg",
    intro:
      "Iedereen handelt goed als het gemakkelijk is. De echte toets komt wanneer het wat kost — wanneer belangen botsen, collega's twijfelen, of de druk groot is. Sta jij dan nog rechtop?",
    statements: [
      "Ik houd vast aan mijn principes, ook als de omgeving druk zet om een andere richting op te gaan.",
      "Ik neem verantwoordelijkheid voor mijn beslissingen, ook als ze onpopulair zijn.",
      "Ik durf te zeggen wat ik denk, ook als dat mij in een moeilijke positie brengt.",
      "Ik hou vol — ook als een ethisch juiste koers weerstand oplevert of langzaam gaat.",
    ],
    reflectie: "Wanneer heb jij je rug recht gehouden terwijl dat je iets kostte? En wanneer heb je dat niet gedaan?",
    lowNote:
      "Morele moed groeit. De vraag is niet of je altijd standhoudt — maar of je het ziet wanneer je dat niet doet.",
  },
];

const state = {
  step: 0,
  scores: {},
  reflecties: {},
};

let chartInstance = null;

function avg(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function renderHero(container, dim) {
  const img = document.createElement("img");
  img.className = "hero-img";
  img.alt = "";
  img.src = dim?.image || "beelden/beeld-opening.jpg";
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = `hero-placeholder ${dim?.heroClass || "hero-opening"}`;
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", "Sfeerbeeld");
    img.replaceWith(ph);
  };
  container.prepend(img);
}

function renderProgress(current) {
  const el = document.getElementById("dim-progress");
  if (!el) return;
  el.innerHTML = `
    <div class="progress" aria-label="Voortgang">
      ${DIMENSIONS.map((d, i) => `<span class="progress-dot ${i < current ? "done" : i === current ? "current" : ""}"></span>`).join("")}
      <span class="progress-label">Dimensie ${current + 1} van 5 — ${DIMENSIONS[current].label}</span>
    </div>`;
}

function renderScale(statementIdx, dimId) {
  const key = `${dimId}_${statementIdx}`;
  const selected = state.scores[key];
  return `
    <div class="scale" data-statement="${statementIdx}">
      ${SCALE_LABELS.map((label, i) => {
        const val = i + 1;
        return `<button type="button" class="scale-btn ${selected === val ? "selected" : ""}" data-val="${val}" aria-label="${label}" title="${label}"></button>`;
      }).join("")}
    </div>
    <div class="scale-hint" id="hint-${key}">${selected ? SCALE_LABELS[selected - 1] : ""}</div>`;
}

function bindScales(dimId) {
  document.querySelectorAll(".scale").forEach((scaleEl) => {
    const stmtIdx = scaleEl.dataset.statement;
    scaleEl.querySelectorAll(".scale-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = Number(btn.dataset.val);
        const key = `${dimId}_${stmtIdx}`;
        state.scores[key] = val;
        scaleEl.querySelectorAll(".scale-btn").forEach((b) => b.classList.toggle("selected", Number(b.dataset.val) === val));
        const hint = document.getElementById(`hint-${key}`);
        if (hint) hint.textContent = SCALE_LABELS[val - 1];
      });
    });
  });
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  window.scrollTo(0, 0);
}

function validateDimension(dim) {
  for (let i = 0; i < dim.statements.length; i++) {
    if (!state.scores[`${dim.id}_${i}`]) {
      return false;
    }
  }
  return true;
}

function dimensionAverages() {
  return DIMENSIONS.map((d) => {
    const vals = d.statements.map((_, i) => state.scores[`${d.id}_${i}`]);
    return avg(vals);
  });
}

function renderDimension(idx) {
  const dim = DIMENSIONS[idx];
  const container = document.getElementById("dim-content");
  renderProgress(idx);

  container.innerHTML = `
    <div class="dim-title">${dim.label}</div>
    <div class="dim-meta">${dim.subtitle}</div>
    <div class="intro"><blockquote>${dim.intro}</blockquote></div>
    ${dim.statements
      .map(
        (text, i) => `
      <div class="statement">
        <p>${text}</p>
        ${renderScale(i, dim.id)}
      </div>`
      )
      .join("")}
    <div class="reflectie">
      <div class="reflectie-label">Reflectie — niet gescoord</div>
      <p>${dim.reflectie}</p>
      <textarea id="reflectie-${dim.id}" placeholder="Optioneel — jouw gedachten…">${state.reflecties[dim.id] || ""}</textarea>
    </div>
    <p class="dim-error" id="dim-error" hidden>Beantwoord alle stellingen voordat je verdergaat.</p>
    <div class="btn-row no-print">
      <button type="button" class="btn btn-primary" id="btn-next-dim">${idx < 4 ? "Verder" : "Naar mijn eerlijke zelfbeeld"}</button>
    </div>`;

  const heroSlot = document.getElementById("dim-hero");
  heroSlot.innerHTML = "";
  renderHero(heroSlot, dim);

  bindScales(dim.id);

  document.getElementById("btn-next-dim").addEventListener("click", () => {
    const err = document.getElementById("dim-error");
    if (!validateDimension(dim)) {
      if (err) {
        err.hidden = false;
        err.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }
    if (err) err.hidden = true;
    state.reflecties[dim.id] = document.getElementById(`reflectie-${dim.id}`)?.value.trim() || "";
    if (idx < 4) {
      state.step = idx + 1;
      renderDimension(state.step);
      showScreen("screen-dimension");
    } else {
      renderResult();
      showScreen("screen-result");
    }
  });
}

function renderResult() {
  const avgs = dimensionAverages();
  const labels = DIMENSIONS.map((d) => d.label);

  document.getElementById("result-growth").innerHTML = DIMENSIONS.map((d, i) => {
    if (avgs[i] > 2) return "";
    return `<div class="growth-note"><strong>${d.label}</strong><p>${d.lowNote}</p></div>`;
  }).join("");

  const ctx = document.getElementById("radar-chart");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          data: avgs,
          backgroundColor: "rgba(44, 95, 74, 0.3)",
          borderColor: "#2c5f4a",
          borderWidth: 1.5,
          pointBackgroundColor: "#2c5f4a",
          pointRadius: 3,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { display: false },
          grid: { color: "#d5cfc6" },
          angleLines: { color: "#d5cfc6" },
          pointLabels: {
            font: { family: "Jost", size: 12 },
            color: "#1c1c1c",
          },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

function resetAll() {
  if (!confirm("Wil je opnieuw beginnen? Alle antwoorden worden gewist.")) return;
  state.step = 0;
  state.scores = {};
  state.reflecties = {};
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  showScreen("screen-landing");
}

function init() {
  document.getElementById("btn-start")?.addEventListener("click", () => {
    state.step = 0;
    renderDimension(0);
    showScreen("screen-dimension");
  });

  document.getElementById("btn-restart")?.addEventListener("click", resetAll);
  document.getElementById("btn-restart-result")?.addEventListener("click", resetAll);
  document.getElementById("btn-print")?.addEventListener("click", () => window.print());

  const landingHero = document.getElementById("landing-hero");
  if (landingHero) {
    landingHero.innerHTML = "";
    const img = document.createElement("img");
    img.className = "hero-img";
    img.src = "beelden/beeld-opening.jpg";
    img.alt = "";
    img.onerror = () => {
      const ph = document.createElement("div");
      ph.className = "hero-placeholder hero-opening";
      img.replaceWith(ph);
    };
    landingHero.appendChild(img);
  }
}

document.addEventListener("DOMContentLoaded", init);
