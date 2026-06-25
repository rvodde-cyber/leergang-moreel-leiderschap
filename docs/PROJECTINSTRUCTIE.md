# Projectinstructie — Leergang Moreel Leiderschap

Versie juni 2026 · Referentiedocument voor Cursor-bouw

## Context & doel

Nederlandse leergang Moreel Leiderschap / Moreel Vakmanschap voor gemengde HBO/WO-doelgroep, als verdiepingsmodule bij leiderschapsprogramma's. Vier sessies:

| Sessie | Naam | Timing |
|--------|------|--------|
| B1 | Zien | — |
| B2 | Handelen | — |
| B3 | Koers | — |
| B4 | Terugkomst | ~3 maanden na B3 |

Wetenschappelijke onderbouwing aanwezig maar **onzichtbaar** voor deelnemers — beleving staat voorop.

## Het model — vijf dimensies (vaste volgorde)

Volgorde is betekenisvol. **Buik nooit samenvoegen** met analytische of emotionele dimensies.

1. **Hoofd** — Waarnemen
2. **Buik** — Intuïtie / niet-pluisgevoel (pre-cognitief)
3. **Hart** — Afwegen
4. **Handen** — Handelen
5. **Ruggegraat** — Volharden

## Drie gouden quotes (veldonderzoek Richard Voddé)

Altijd meenemen — levende stem, geen decoratie.

1. *"Het gaat om je innerlijk kompas volgen, je eigen gevoel over wat goed en fout is. Met hoofd, hart en handen."*  
   → Opening / Hoofd

2. *"Je ethiek moet heel stevig zijn om rechtop te kunnen blijven staan, recht te houden in de wind."*  
   → Ruggegraat

3. *"Twijfel is een teken van intelligentie — de eeuwige twijfel of je het goede doet."*  
   → Buik of Hart

## Wat te bouwen (hoofdapp)

- **Programma** — 4 sessies gekoppeld aan dimensies
- **Moreel Kompas** — dilemma-tool, 5 stappen
- **Dagboek** — morele temperatuur + reflectie
- **Groei-dashboard** — voortgang over tijd

## Sub-instrument: Eerlijk Oordeel

Aparte app in `instruments/eerlijk-oordeel/` (**app gebouwd**):

- "Waar sta jij als ethisch leider?"
- Stellingen, reflectievragen, Chart.js radardiagram
- Typografie: Cormorant Garamond + Jost
- Beelden: Adobe Firefly — prompts in `beelden/FIREFLY-PROMPTS.md`
- Voortgang: `instruments/eerlijk-oordeel/VOLGENDE-STAP.md`

## Op de horizon

- Zelfscan begin en einde leergang
- Micro-opdrachten per week tussen sessies
- Optionele 360-feedback na B4
- Trainers-dashboard, anonieme groepsruimte, reminders
- Supabase: project `moral-maps`, ID `zkiavxldremirlvcmoef`

## Rolverdeling

| Rol | Taak |
|-----|------|
| Claude | Inhoud, concept, briefings, instructies |
| Cursor | Technische bouw (vanilla HTML/CSS/JS) |
| Firefly | Beeldgeneratie (prompts in `beelden/FIREFLY-PROMPTS.md`) |

## Stijl

- Beeldtaal: solitaire figuren, wijde landschappen, introspectief
- Toon: warm maar ernstig, uitnodigend, niet soft, niet moralistisch
- Wetenschap onzichtbaar voor deelnemers

## Bronnen (achtergrond, niet zichtbaar in app)

- Vera & Den Hartog (2013)
- Heres (2012)
- Kalshoven & Den Hartog
- Eigen veldonderzoek Richard Voddé
