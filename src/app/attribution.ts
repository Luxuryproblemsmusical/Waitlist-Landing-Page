const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'galop_attribution';

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

/**
 * UTM params from the landing URL, remembered for the session so they survive
 * a reload or a share-sheet round trip before the visitor actually signs up.
 * First touch wins — we don't overwrite an earlier campaign with a later one.
 */
export function getAttribution(): Attribution {
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }

  if (Object.keys(fresh).length && !Object.keys(stored).length) {
    stored = fresh;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {}
  }

  return stored;
}
