# Eerlijk Oordeel — voortgang & volgende stap

**Laatst bijgewerkt:** 24 juni 2026  
**Projectmap:** `leergang-moreel-leiderschap/instruments/eerlijk-oordeel/`

---

## Wat is klaar

- [x] Landing + 5 dimensies + resultaatscherm
- [x] Alle stellingen, inleidingen en reflectievragen (Hoofd → Ruggegraat)
- [x] Schaal met 5 bolletjes + tekstlabels (geen cijfers)
- [x] Chart.js-radar (stil, geen animatie)
- [x] Print/PDF via `window.print()`
- [x] Gradient-placeholders als beelden ontbreken
- [x] Koppeling hoofdapp (nav: **Persoonlijk → Eerlijk Oordeel**)
- [x] Firefly-prompts: `beelden/FIREFLY-PROMPTS.md`

## Morgen — prioriteit 1: beelden

1. Open `beelden/FIREFLY-PROMPTS.md`
2. Genereer 6 beelden in Adobe Firefly (Photo, 16:9)
3. Crop naar **1440×600**, sla op als JPEG in `beelden/`
4. Test: `npx serve .` → doorloop instrument → check sfeer per scherm

**Geen code nodig** — de app laadt beelden automatisch zodra de bestanden er staan.

## Morgen — prioriteit 2 (optioneel, Cursor)

| Taak | Bestand | Notitie |
|------|---------|---------|
| Volledige briefing archiveren | `docs/incoming/eerlijk-oordeel-bouwbriefing.md` | Nu afgekapt; volledige tekst staat in chat juni 2026 |
| Tabler Icons CDN | `index.html` | Briefing noemde icons; nog niet gebruikt — alleen als je icons wilt |
| Lesplannen B1–B4 | hoofdapp | Volgende grote bouwstap leergang (Claude) |
| Deploy | Vercel | Hele `leergang-moreel-leiderschap` repo |

## Testchecklist (vóór live)

- [ ] Alle 6 schermen doorlopen zonder fout
- [ ] Validatie: kan niet verder zonder alle stellingen
- [ ] Radar toont juiste gemiddelden
- [ ] Reflectie-notities bij score ≤ 2 verschijnen
- [ ] PDF-print toont alleen resultaatscherm
- [ ] Herstart wist alles en begint opnieuw
- [ ] Mobiel: schaal en tekst leesbaar

## Bestandsstructuur

```
eerlijk-oordeel/
├── index.html              ← shell + schermen
├── css/eerlijk-oordeel.css ← styling + print
├── js/eerlijk-oordeel.js   ← data, navigatie, Chart.js
├── beelden/
│   ├── FIREFLY-PROMPTS.md  ← START HIER morgen
│   └── *.jpg               ← nog te plaatsen
├── README.md
└── VOLGENDE-STAP.md        ← dit bestand
```

## Cursor-chat hervatten

Plak morgen in Cursor:

> *Verder met leergang-moreel-leiderschap. Eerlijk Oordeel staat in instruments/eerlijk-oordeel. Beelden zijn geplaatst [wel/niet]. Lees VOLGENDE-STAP.md.*

## Gerelateerde docs

- Bouwbriefing (concept): `docs/incoming/eerlijk-oordeel-bouwbriefing.md`
- Projectoverzicht: `docs/PROJECTINSTRUCTIE.md`
- Import-checklist: `docs/IMPORT-CHECKLIST-CLAUDE.md`
