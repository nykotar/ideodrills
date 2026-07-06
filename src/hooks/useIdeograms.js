import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage";

const DEFAULT_IDEOGRAMS = {
  Biological: true,
  Land: true,
  Manmade: true,
  "Motion/Energy": true,
  Natural: true,
  "Space/Air": true,
  Water: true,
};

function loadDefaultIdeograms() {
  const stored = readJSON("ideograms", null);
  if (!stored) return DEFAULT_IDEOGRAMS;

  // Only keep keys that still exist in DEFAULT_IDEOGRAMS, so stale/renamed
  // categories from an older version can't leak into the current state.
  return Object.keys(DEFAULT_IDEOGRAMS).reduce((acc, key) => {
    acc[key] = stored[key] || false;
    return acc;
  }, {});
}

export function useIdeograms() {
  const [defaultIdeograms, setDefaultIdeograms] = useState(loadDefaultIdeograms);
  const [customIdeograms, setCustomIdeograms] = useState(() => readJSON("customIdeograms", []));

  useEffect(() => {
    writeJSON("ideograms", defaultIdeograms);
  }, [defaultIdeograms]);

  useEffect(() => {
    writeJSON("customIdeograms", customIdeograms);
  }, [customIdeograms]);

  function toggleIdeogram(name, checked) {
    setDefaultIdeograms((prev) => ({ ...prev, [name]: checked }));
  }

  function addCustomIdeogram(name) {
    if (!name) return;

    const ideogram = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    if (
      !customIdeograms.includes(ideogram) &&
      !Object.keys(defaultIdeograms).includes(ideogram)
    ) {
      setCustomIdeograms((prev) => [...prev, ideogram]);
    }
  }

  function removeIdeogram(name) {
    setCustomIdeograms((prev) => prev.filter((ideogram) => ideogram !== name));
  }

  const enabledIdeograms = [
    ...customIdeograms,
    ...Object.keys(defaultIdeograms).filter((k) => defaultIdeograms[k]),
  ];

  return {
    defaultIdeograms,
    customIdeograms,
    enabledIdeograms,
    toggleIdeogram,
    addCustomIdeogram,
    removeIdeogram,
  };
}
