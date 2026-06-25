/**
 * Programma: 3 dagdelen + terugkomdag.
 * NIET 5 modules — ChatGPT verwarde model-elementen met bijeenkomsten (afgewezen in sparring).
 */
export const DAGDELEN = [
  {
    id: "dag1",
    nummer: 1,
    titel: "Zien en Voelen",
    centraleVraag: "Wat gebeurt er moreel — en waar voel ik dat?",
    dimensies: ["hoofd", "buik"],
    themas: ["Moreel bewustzijn", "Het signaal herkennen", "Niet-pluisgevoel"],
    appOpdracht: "Dagboek: vul Zien en Voelen in. Noteer één situatie uit je leidinggevende praktijk.",
  },
  {
    id: "dag2",
    nummer: 2,
    titel: "Wegen en Handelen",
    centraleVraag: "Wat weeg ik af — en wat doe ik ermee?",
    dimensies: ["hart", "handen"],
    themas: ["Oordeelsvorming", "Morele moed", "Moeilijke gesprekken"],
    appOpdracht: "Doorloop één dilemma met het Moreel Kompas. Sla het resultaat op in je dagboek.",
  },
  {
    id: "dag3",
    nummer: 3,
    titel: "Volhouden en Cultuur",
    centraleVraag: "Welke koers houd ik — en welke cultuur versterk ik?",
    dimensies: ["ruggegraat"],
    themas: ["Koers houden onder druk", "Ethische cultuur versterken", "Integriteit in de tijd"],
    appOpdracht: "Reflecteer op Volhouden in het dagboek. Deel anoniem in de groepsruimte wat je herkent.",
  },
];

export const TERUGKOMDAG = {
  titel: "Terugkomdag",
  timing: "Na enkele weken (ca. 6 weken na dagdeel 3)",
  centraleVraag: "Wat is er in de praktijk gebeurd?",
  agenda: [
    "Terugblik via dagboek — eigen entries als vertrekpunt",
    "Ervaringen delen (anoniem of in gesprek)",
    "Persoonlijk actieplan formuleren",
  ],
  actieplanVragen: [
    "Waar sta ik voor?",
    "Waar ga ik voor?",
    "Wat ga ik beschermen?",
    "Wat ga ik volhouden?",
  ],
  appOpdracht: "Vul het actieplan in je dagboek in. Vergelijk morele temperatuur met eerdere entries.",
};

/** Alternatieve sessiecodes (projectinstructie) — mapping naar dagdelen */
export const SESSIE_CODES = [
  { code: "B1", naam: "Zien", koppeltAan: "dag1" },
  { code: "B2", naam: "Handelen", koppeltAan: "dag2" },
  { code: "B3", naam: "Koers", koppeltAan: "dag3" },
  { code: "B4", naam: "Terugkomst", koppeltAan: "terugkomdag" },
];
