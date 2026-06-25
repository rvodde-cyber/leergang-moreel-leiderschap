/**
 * Officieel Moreel Vakmanschap-model — vaste volgorde.
 * Lichaamsmetafoor (Hoofd…Ruggegraat) + stapnaam (Zien…Volhouden) + fase.
 * Buik/Voelen: pre-cognitief — nooit samenvoegen met Hoofd of Hart.
 */
export const KERNZIN =
  "Moreel vakmanschap is geen eenmalige keuze, maar een voortdurende praktijk van zien, voelen, wegen, handelen en koers houden.";

export const DIMENSIES = [
  {
    id: "hoofd",
    volgorde: 1,
    metafoor: "Hoofd",
    stap: "Zien",
    stapLang: "Kijken wordt Zien",
    fase: "Bewustwording",
    kernvraag: "Wat gebeurt hier echt?",
    kleur: "#185fa5",
    beschrijving: "Ziet en herkent wat er moreel op het spel staat — feiten, patronen, blinde vlekken.",
    dagboekPrompt: "Wat viel me vandaag op — feitelijk, zonder oordeel?",
  },
  {
    id: "buik",
    volgorde: 2,
    metafoor: "Buik",
    stap: "Voelen",
    fase: "Innerlijk kompas",
    kernvraag: "Waar krijg ik morele buikpijn van?",
    kleur: "#854f0b",
    beschrijving: "Signaleert dat er iets niet klopt — het wee-gevoel, intuïtie vóór analyse.",
    dagboekPrompt: "Waar zat het niet-pluisgevoel vandaag?",
  },
  {
    id: "hart",
    volgorde: 3,
    metafoor: "Hart",
    stap: "Wegen",
    fase: "Morele afweging",
    kernvraag: "Wat botst hier allemaal?",
    kleur: "#993556",
    beschrijving: "Weegt wat echt belangrijk is — vanuit waarden en betrokkenheid.",
    dagboekPrompt: "Welke waarden botsten vandaag?",
  },
  {
    id: "handen",
    volgorde: 4,
    metafoor: "Handen",
    stap: "Handelen",
    fase: "Morele moed",
    kernvraag: "Wat vraagt dit van mij?",
    kleur: "#0f6e56",
    beschrijving: "Handelt — maakt de keuze zichtbaar in gedrag, ook als het ongemakkelijk is.",
    dagboekPrompt: "Welke stap heb ik gezet — of nagelaten?",
  },
  {
    id: "ruggegraat",
    volgorde: 5,
    metafoor: "Ruggegraat",
    stap: "Volhouden",
    fase: "Integriteit & volharding",
    kernvraag: "Welke koers wil ik blijven houden?",
    kleur: "#993c1d",
    beschrijving: "Houdt vol onder druk — ook wanneer bijdraaien makkelijker zou zijn.",
    dagboekPrompt: "Welke koers houd ik vast — ook onder druk?",
  },
];

/** Alias voor kompatibiliteit */
export function getDimensie(id) {
  return DIMENSIES.find((d) => d.id === id);
}
