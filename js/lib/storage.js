const PREFIX = "lml_";

export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function loadDagboekEntries() {
  return loadJSON("dagboek", []);
}

export function saveDagboekEntry(entry) {
  const entries = loadDagboekEntries();
  entries.unshift({ ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  saveJSON("dagboek", entries);
  return entries;
}

export function loadKompasHistory() {
  return loadJSON("kompas", []);
}

export function saveKompasRun(run) {
  const history = loadKompasHistory();
  history.unshift({ ...run, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  saveJSON("kompas", history.slice(0, 50));
}
