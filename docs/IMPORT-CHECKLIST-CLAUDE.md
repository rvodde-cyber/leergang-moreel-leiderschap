# Import-checklist — wat uit Claude halen

Plak exports in `docs/incoming/` of direct in Cursor-chat.

---

## Prioriteit 1 — direct nodig voor bouw

- [ ] **`moreel-leiderschap.html`** — volledige Claude-app (Programma, Kompas, Dagboek, Dashboard, groepsruimte)
- [x] **`eerlijk-oordeel`** — app gebouwd in `instruments/eerlijk-oordeel/`; beelden via Firefly (prompts in `beelden/FIREFLY-PROMPTS.md`)
- [ ] **`projectinstructie-moreel-leiderschap-v2.md`** — bijgewerkte instructie

## Prioriteit 2 — inhoud

- [ ] **Lesplannen B1–B4** — nog niet gebouwd in Claude; volgende prioriteit
- [ ] **Moreel Kompas** — dilemma's, 5 stappen, labels
- [ ] **Dagboek** — morele temperatuur, reflectievelden
- [ ] **Groei-dashboard** — metrics en visualisatie
- [ ] **Wervingstekst** — algemeen, geen organisatienaam in repo

## Prioriteit 3 — al bekend (staat in `js/data/`)

- [x] Drie gouden quotes
- [x] Vijf dimensies + volgorde
- [x] Vier sessies B1–B4

## Prioriteit 4 — horizon

- [ ] Zelfscan begin/einde
- [ ] Microgewoontes
- [ ] Trainerdashboard
- [ ] 360-feedback na B4

---

## Waar plaatsen

| Bestand uit Claude | Pad |
|--------------------|-----|
| Hoofdapp HTML | `docs/incoming/moreel-leiderschap.html` |
| Eerlijk Oordeel | `instruments/eerlijk-oordeel/` — zie `VOLGENDE-STAP.md` |
| Projectinstructie v2 | `docs/incoming/projectinstructie-moreel-leiderschap-v2.md` |
| Sessies | `docs/incoming/sessies/` |
| Werving | `docs/incoming/wervingstekst.md` |

---

## Na import

Cursor verwerkt content → `js/data/` + modules. Start chat met:

> *Bouw verder op leergang-moreel-leiderschap; imports staan in docs/incoming/*
