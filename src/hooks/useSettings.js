import { useEffect, useState } from "react";

const DEFAULT_SETTINGS = {
  voices: [],
  voice: "",
  speed: 2,
  time: 2,
  displayIdeogram: false,
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  function handleChange(e) {
    const { id, type, value, checked } = e.target;
    setSettings((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  }

  useEffect(() => {
    function loadVoices() {
      setSettings((prev) => ({ ...prev, voices: speechSynthesis.getVoices() }));
    }

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return { settings, handleChange };
}
