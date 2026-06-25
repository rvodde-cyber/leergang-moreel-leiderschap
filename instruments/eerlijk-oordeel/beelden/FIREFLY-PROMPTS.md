# Beeldprompts — Adobe Firefly

**Project:** Eerlijk Oordeel  
**Doel:** 6 sfeerbeelden voor zelfreflectie-instrument  
**Rechten:** Adobe Firefly — commercieel gebruik volgens jouw Adobe-licentie (controleer Enterprise/Creative Cloud-voorwaarden).

---

## Firefly-instellingen (voor alle 6)

| Instelling | Waarde |
|------------|--------|
| **Content type** | Photo |
| **Beeldverhouding** | Widescreen / 16:9 (genereer breed; crop daarna) |
| **Exportformaat** | JPEG |
| **Doelafmeting** | **1440 × 600 px** (crop na export) |
| **Kwaliteit** | 80–85% JPEG |
| **Stijl** | Fine art / editorial photography — geen illustratie, geen 3D-render |

### Na genereren in Firefly

1. Kies de beste variant (rustig, geen afleiding).
2. Crop naar **2.4:1** (1440×600) — focus op het midden/onderwerp.
3. Sla op met **exacte bestandsnaam** (zie tabel).
4. Plaats in deze map: `instruments/eerlijk-oordeel/beelden/`

### Vermijd in elke prompt (negatief / handmatig afwijzen)

- Gezichten of herkenbare personen
- Tekst, logo's, watermerken
- Stockfoto-gevoel (te perfect, te lachend, thumbs up)
- Felle neonkleuren, HDR-look
- Drukke composities met veel objecten

---

## Overzicht bestanden

| # | Bestandsnaam | Scherm | Dimensie |
|---|--------------|--------|----------|
| 1 | `beeld-opening.jpg` | Landing | — |
| 2 | `beeld-hoofd.jpg` | Stap 1 | Hoofd — Waarnemen |
| 3 | `beeld-buik.jpg` | Stap 2 | Buik — Niet-pluisgevoel |
| 4 | `beeld-hart.jpg` | Stap 3 | Hart — Afwegen |
| 5 | `beeld-handen.jpg` | Stap 4 | Handen — Juiste doen |
| 6 | `beeld-ruggegraat.jpg` | Stap 5 | Ruggegraat — Koers houden |

---

## Beeld 1 — Opening

**Bestand:** `beeld-opening.jpg`  
**Gevoel:** Alleen. Stille kamer. Groot raam. Vergezicht of ondergaande zon.

### Firefly-prompt (kopieer)

```
A single person seen from behind, standing at a large floor-to-ceiling window in a sparse minimalist room at dusk. Outside: a vast calm sea with the sun just below the horizon, soft orange and slate blue light. The figure is a dark silhouette, no face visible. Mood: solitary, contemplative, quietly brave. Warm muted tones: deep ochre, faded rust, slate blue. Editorial fine art photography, shallow depth of field, subtle film grain, natural light only. Empty room, no furniture clutter. No text, no logos, no watermark.
```

### Kortere variant (als Firefly te veel detail negeert)

```
Silhouette of a person from behind at a large window, sunset over calm sea, sparse dim room, contemplative mood, editorial photography, film grain, warm muted colors, no face, no text
```

### Check na generatie

- [ ] Geen gezicht zichtbaar  
- [ ] Rustig, niet dramatisch-theatraal  
- [ ] Past bij warm gebroken wit (#F5F0EA) en bosgroen (#2C5F4A)

---

## Beeld 2 — Hoofd (Waarnemen & redeneren)

**Bestand:** `beeld-hoofd.jpg`  
**Gevoel:** Helder zien in duisternis. Alertheid. Het moment vóór begrip.

### Firefly-prompt

```
Close-up of a single candle flame or old oil lantern in a dark room. The flame is sharp and bright, everything else softly out of focus in deep shadow. Mood: clarity emerging from darkness, alert perception, stillness before understanding. Warm amber and gold against black and deep brown. Fine art photography, high contrast, subtle film grain, single light source. No people, no hands, no text, no logos.
```

### Kortere variant

```
Single candle flame close-up in dark room, sharp flame soft background, amber light high contrast, fine art photography, film grain, no people, no text
```

### Check

- [ ] Eén duidelijk lichtpunt (niet meerdere kaarsen)  
- [ ] Donker genoeg — contrast met lichte UI eronder

---

## Beeld 3 — Buik (Het niet-pluisgevoel)

**Bestand:** `beeld-buik.jpg`  
**Gevoel:** Iets onder het oppervlak. Onrustig maar niet angstig. Nog niet benoemd.

### Firefly-prompt

```
Dark still lake water seen from just above the surface, calm but opaque, bottom not visible. Faint reflection of heavy cloudy sky on the water. Mood: unsettling but quiet, something beneath the surface not yet named, introspective tension. Cool dark tones, almost monochrome with subtle teal and charcoal. Fine art photography, very still symmetrical composition, minimal ripples. No people, no boats, no text, no logos.
```

### Kortere variant

```
Dark opaque lake surface from above, cloudy sky reflection, still water, cool teal charcoal tones, unsettling calm mood, fine art photography, no people, no text
```

### Check

- [ ] Geen horror/scherpe dreiging — subtiel onbehagen  
- [ ] Past bij koele dimensie (blauw-groen gradient-placeholder)

---

## Beeld 4 — Hart (Afwegen & verbinden)

**Bestand:** `beeld-hart.jpg`  
**Gevoel:** Zorg. Afwegen. Verantwoordelijkheid voor iets kwetsbaars.

### Firefly-prompt

```
Two weathered hands cupped together seen from above, holding something small and fragile like a seed or smooth pebble. Soft natural side light, warm skin tones. Mood: care, weighing a decision, gentle responsibility. Intimate editorial photography, shallow depth of field, neutral blurred background. No face, no body, no jewelry, no text, no logos.
```

### Kortere variant

```
Weathered hands cupped from above holding small seed, soft natural light, warm tones, care and responsibility mood, editorial photography, no face, no text
```

### Check

- [ ] Alleen handen — geen gezicht of torso  
- [ ] Warm, niet sentimenteel/zweverig

---

## Beeld 5 — Handen (Het juiste doen)

**Bestand:** `beeld-handen.jpg`  
**Gevoel:** Gekozen richting. Actie. Consistentie in kleine stappen.

### Firefly-prompt

```
A single clear footprint in wet sand at the shoreline, or one purposeful footprint trail leading forward. Low angle near the ground, golden hour light, long soft shadow. Mood: chosen direction, walking your path, quiet determination. Warm earthy tones: sand, ochre, soft brown. Fine art photography, minimal composition, empty beach or path, no people visible. No text, no logos.
```

### Alternatief (als zand te generiek is)

```
A worn narrow path through a golden field at dusk, low camera angle, long shadows, purposeful direction forward, warm earthy tones, fine art photography, no people, no text
```

### Check

- [ ] Beweging/richting voelbaar  
- [ ] Geen wandelaar in beeld

---

## Beeld 6 — Ruggegraat (Koers houden onder druk)

**Bestand:** `beeld-ruggegraat.jpg`  
**Gevoel:** Standhouden. Boom in wind. Volharding.

### Firefly-prompt

```
A solitary bare tree standing alone in an open windy field. Branches bent by wind but trunk straight and firm. Dramatic heavy cloudy sky, last pale light on the horizon. Mood: endurance, moral courage, staying upright under pressure. Muted greens, dark gray sky, single slash of pale light. Fine art landscape photography, wide composition, no people, no buildings, no text, no logos.
```

### Kortere variant

```
Lone bare tree in windy open field, bent branches strong trunk, dramatic cloudy sky, pale horizon light, endurance mood, fine art photography, no people, no text
```

### Check

- [ ] Eén boom — niet een bos  
- [ ] Krachtig maar niet apocalyptisch

---

## Workflow morgen (5–10 min per beeld)

1. Open [Adobe Firefly](https://firefly.adobe.com/) → **Text to Image**
2. Plak prompt → genereer 4 varianten
3. **Generative Expand** alleen indien nodig voor bredere crop
4. Download → crop **1440×600** (Photoshop, Preview, of [squoosh.app](https://squoosh.app))
5. Hernoem → zet in `beelden/`
6. Herlaad `index.html` — placeholder verdwijnt automatisch

## Status beelden

| Bestand | Gegenereerd | In map geplaatst | Visueel OK |
|---------|-------------|------------------|------------|
| beeld-opening.jpg | ☐ | ☐ | ☐ |
| beeld-hoofd.jpg | ☐ | ☐ | ☐ |
| beeld-buik.jpg | ☐ | ☐ | ☐ |
| beeld-hart.jpg | ☐ | ☐ | ☐ |
| beeld-handen.jpg | ☐ | ☐ | ☐ |
| beeld-ruggegraat.jpg | ☐ | ☐ | ☐ |

---

*Prompts afgeleid van bouwbriefing Eerlijk Oordeel (Claude). Beeldgeneratie via Firefly i.p.v. Gemini vanwege rechten.*
