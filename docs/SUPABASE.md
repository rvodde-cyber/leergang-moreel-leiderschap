# Supabase — groepsruimte Leergang Moreel Leiderschap

Gedeeld Supabase-project met Moral Maps — **aparte tabellen** voor deze leergang.

## Connectie

```
Project:  moral-maps
ID:       zkiavxldremirlvcmoef
URL:      https://zkiavxldremirlvcmoef.supabase.co
Anon key: zet in .env (niet committen)
```

Kopieer `.env.example` naar `.env` en vul `VITE_SUPABASE_ANON_KEY` of `SUPABASE_ANON_KEY` in.

## Tabellen (bestaan al)

### `ml_posts`

Anonieme berichten in de groepsruimte.

| Kolom | Doel |
|-------|------|
| id | UUID |
| body | Tekst |
| group_code | Groepscode (deelnemers zelfde cohort) — **controleren of kolom bestaat** |
| created_at | Tijdstip |
| herkenbaar_count | Via trigger |

### `ml_herkenbaar`

"Herkenbaar"-reacties op posts.

| Kolom (verwacht) | Doel |
|------------------|------|
| id | UUID |
| post_id | FK → ml_posts |
| created_at | Tijdstip |

### Trigger

`update_herkenbaar_count` — houdt `herkenbaar_count` op `ml_posts` bij.

## RLS

Open read + insert policies (anoniem deelnemen).

## Cursor-implementatie

- Client: `js/lib/supabase.js`
- Module: `js/modules/groep.js` (skeleton)
- Privé data blijft in `localStorage` via `js/lib/storage.js`

## Migraties

Nieuwe tabellen voor leergang (zelfscan, trainerdashboard) komen later in apart SQL-bestand `docs/sql/`.
