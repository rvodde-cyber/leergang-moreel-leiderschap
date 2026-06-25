# Leergang Moreel Leiderschap

**Moreel Leiderschap — Van bewustzijn naar moedige praktijk**

Standalone webapp voor leidinggevenden (zorg, onderwijs, overheid, bedrijfsleven).

## Starten

```bash
cd "leergang-moreel-leiderschap"
npx serve .
```

Open `http://localhost:3000` — of dubbelklik `index.html`.

## Live (Vercel)

| Wat | URL |
|-----|-----|
| **Hoofdapp** | https://leergang-moreel-leiderschap.vercel.app/ |
| **Eerlijk Oordeel** | https://leergang-moreel-leiderschap.vercel.app/instruments/eerlijk-oordeel/ |
| **Morele Lakmoesproef** | https://organisatie-morele-lakmoestest.vercel.app/ (link in nav + programma) |

Dashboard: https://vercel.com/rvodde-1442s-projects/leergang-moreel-leiderschap

## Configuratie Supabase (groepsruimte)

1. Kopieer `js/config.example.js` → `js/config.js`
2. Vul `SUPABASE_KEY` in (anon key uit Supabase-dashboard)
3. `js/config.js` staat in `.gitignore`

## Structuur

```
index.html          ← hoofdapp (Claude-design + Cursor-optimalisaties)
css/app.css
js/app.js           ← alle logica
js/config.js        ← Supabase (lokaal, niet committen)
docs/incoming/      ← archief originele Claude-export
instruments/eerlijk-oordeel/  ← zelfreflectie-instrument (app klaar; beelden via Firefly)
```

**Eerlijk Oordeel — morgen verder:** `instruments/eerlijk-oordeel/VOLGENDE-STAP.md` · Firefly-prompts in `beelden/FIREFLY-PROMPTS.md`

## Wat zit in de app

| Scherm | Functie |
|--------|---------|
| Het model | 5 stappen, klikbaar, veldquotes |
| Programma | 3 dagdelen, uitklapbaar |
| Terugkomdag | 6-wekentraject + agenda |
| Mijn dagboek | 5 velden + temperatuur 1–10, localStorage |
| Moreel kompas | 5 stappen + archetypen |
| Groei | Temperatuurgrafiek + vergelijking |
| Groepsruimte | Supabase, anoniem, herkenbaar |
| Morele Lakmoesproef | Externe organisatiescan (link in nav) |

## Bron

Gebaseerd op `moreel-leiderschap.html` (Claude, juni 2026), geïntegreerd en geoptimaliseerd in Cursor.

## Gerelateerd (apart project)

- `rvodde-cyber-community-moreel-vakmanschap` — community-platform
- `moral-maps` — MAPS-trilogie (deelt Supabase-project)
