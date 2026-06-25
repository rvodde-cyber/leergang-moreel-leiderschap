import { DIMENSIES } from "./dimensies.js";

/** Moreel Kompas — volgt officieel model exact */
export const KOMPAS_STAPPEN = DIMENSIES.map((d, i) => ({
  stap: i + 1,
  dimensieId: d.id,
  label: d.stap,
  metafoor: d.metafoor,
  kernvraag: d.kernvraag,
  prompt: d.kernvraag,
}));

export const DILEMMA_PLACEHOLDER = {
  titel: "Eigen dilemma",
  context: "Beschrijf een situatie uit je leidinggevende praktijk. Importeer casussen via docs/incoming/moreel-kompas/",
};
