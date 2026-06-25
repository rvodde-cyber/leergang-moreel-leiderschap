# Synthese — Claude/ChatGPT-sparring → Cursor-bouw

Wat uit het gesprek **nuttig** is (verwerkt in app) vs. wat **niet** klopt.

---

## ✅ Overgenomen en gebouwd

| Beslissing | Waar |
|------------|------|
| **5 elementen**, vaste volgorde: Hoofd→Buik→Hart→Handen→Ruggegraat | `js/data/dimensies.js` |
| Officiële stapnamen: Zien, Voelen, Wegen, Handelen, Volhouden + kernvragen | idem |
| Fases: Bewustwording → Innerlijk kompas → … → Integriteit & volharding | idem |
| Kernzin Moreel Vakmanschap | Model-scherm |
| **3 dagdelen + terugkomdag** (niet 5 modules) | `js/data/programma.js` |
| Doelgroep: leidinggevenden breed | Programma-intro |
| Dagboek: **5 velden** + temperatuur **1–10** + teruglezen | `js/modules/dagboek.js` |
| Moreel Kompas: 5 stappen + opslaan naar dagboek | `js/modules/moreel-kompas.js` |
| Archetypen: Odysseus, Antigone, Sisyphus | `js/data/archetypen.js` |
| 5 veldquotes (NL) | `js/data/quotes.js` |
| Terugkomdag: actieplan 4 vragen | `js/data/programma.js` |
| Groepsruimte: Supabase + groepscode | `js/modules/groep.js` |
| App-naam: *Van bewustzijn naar moedige praktijk* | `index.html` |
| 5 schermen: Model, Programma, Dagboek, Kompas, Groep (+ Groei) | navigatie |

---

## ❌ Niet overnemen

| ChatGPT/oude versie | Waarom |
|---------------------|--------|
| **5 modules = 5 bijeenkomsten** | Verwarde model-elementen met programma — Richard corrigeerde |
| Hoofd als "redeneren" (rationalistisch) | Vervangen door Zien/waarnemen |
| Buik samenvoegen met Hoofd of Hart | Expliciet verboden — pre-cognitief |
| Alleen universitaire dilemma's | Doelgroep is breder |
| Gesimuleerde groepsruimte | Gekozen: echte Supabase |
| Trainer-modus in app | Puur persoonlijk instrument + gedeelde laag |

---

## ⏳ Nog nodig uit Claude-artifact

De **volledige HTML** uit Claude bevat waarschijnlijk meer UI-polish, weekthema's, tijdlijn terugkomdag (6 weken). Importeer:

`docs/incoming/moreel-leiderschap.html`

Dan merge Cursor: design + ontbrekende copy.

---

## Mapping sessiecodes

| Code | Dagdeel |
|------|---------|
| B1 Zien | Dagdeel 1 (Zien + Voelen) |
| B2 Handelen | Dagdeel 2 (Wegen + Handelen) |
| B3 Koers | Dagdeel 3 (Volhouden + Cultuur) |
| B4 Terugkomst | Terugkomdag |

---

## Volgende bouwstappen

1. Claude HTML importeren en visueel alignen
2. `eerlijk-oordeel-bouwbriefing.md` → sub-app
3. Lesplannen B1–B4 (Claude: nog te schrijven)
4. Zelfscan, microgewoontes, trainerdashboard (horizon)
