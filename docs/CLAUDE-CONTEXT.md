# Claude-projectcontext (juni 2026)

Samenvatting uit Claude-projectgeheugen — referentie voor Cursor-bouw.

## Doel & doelgroep

Richard Voddé ontwikkelt **Leergang Moreel Leiderschap** (ook: **Moreel Vakmanschap**) voor professionele organisaties in zorg, onderwijs en publieke sector. Gemengde HBO/WO-groep. Programma is **breed inzetbaar** — geen enkele organisatie is exclusief eigenaar.

## Vijf dimensies (vaste volgorde — niet herschikken)

| # | Dimensie | Betekenis |
|---|----------|-----------|
| 1 | Hoofd | Waarnemen |
| 2 | Buik | Intuïtie / niet-pluisgevoel (**pre-cognitief**, nooit samenvoegen) |
| 3 | Hart | Afwegen |
| 4 | Handen | Handelen |
| 5 | Ruggegraat | Volharden |

## Vier sessies

| Sessie | Naam |
|--------|------|
| B1 | Zien |
| B2 | Handelen |
| B3 | Koers |
| B4 | Terugkomst (~3 maanden na B3) |

## Drie gouden quotes (veldonderzoek — altijd meenemen)

1. *"Het gaat om je innerlijk kompas volgen, je eigen gevoel over wat goed en fout is. Met hoofd, hart en handen."*  
   → Hoofd / Hart / Handen / opening

2. *"Je ethiek moet heel stevig zijn om rechtop te kunnen blijven staan, recht te houden in de wind."*  
   → Ruggegraat

3. *"Twijfel is een teken van intelligentie — de eeuwige twijfel of je het goede doet."*  
   → Buik

## Wat Claude al heeft opgeleverd (nog importeren naar `docs/incoming/`)

| Deliverable | Beschrijving |
|-------------|--------------|
| `moreel-leiderschap.html` | Complete standalone app: Programma, Moreel Kompas (5 stappen), Dagboek, Groei-dashboard; localStorage + Supabase groep |
| `eerlijk-oordeel-bouwbriefing.md` | Zelfinstrument: 5 dimensies, vraagsets, reflectie, 6 Gemini-prompts, Chart.js radar, kleurpalet, tone of voice |
| `projectinstructie-moreel-leiderschap-v2.md` | Bijgewerkte projectinstructie (brede positionering) |
| Wervingstekst | Add-on bij bestaand leiderschapsprogramma (algemeen houden) |

## Supabase (al live)

- Project: **moral-maps**
- ID: `zkiavxldremirlvcmoef`
- URL: `https://zkiavxldremirlvcmoef.supabase.co`
- Tabellen: `ml_posts`, `ml_herkenbaar`
- Mechanisme: anoniem posten, "Herkenbaar"-reactie, trigger `update_herkenbaar_count`
- RLS: open read/insert

Zie `docs/SUPABASE.md` voor Cursor-koppeling.

## Op de horizon

- Lesplannen B1–B4 (volgende prioriteit Claude — **nog niet gebouwd**)
- Zelfscan begin/einde
- Microgewoontes per week
- Reminders, trainerdashboard
- Optionele 360-feedback na B4

## Rolverdeling

| Rol | Taak |
|-----|------|
| Claude | Inhoud, creatieve regie, briefings |
| Cursor | Technische bouw (vanilla HTML/CSS/JS) |
| Gemini | Beeldgeneratie (Engelse prompts) |

## Principes

- Wetenschap (Vera & Den Hartog, Heres, eigen onderzoek) **onzichtbaar** voor deelnemers
- Quotes van echte leidinggevenden zijn **primaire bron**, geen decoratie
- Buik-dimension was bewuste toevoeging — niet weglaten
- Iteratief: Richard corrigeert framing; verwacht pushback op structurele fouten

## Typografie

- **Huidig:** Cormorant Garamond + Jost
- Eerder prototype: Playfair Display + Source Serif 4 (vervangen)
