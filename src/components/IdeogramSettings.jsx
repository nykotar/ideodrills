import { useState } from "react";
import Toggle from "./Toggle";
import Badge from "./Badge";

function IdeogramSettings({
  defaultIdeograms,
  toggleIdeogram,
  customIdeograms,
  addCustomIdeogram,
  removeIdeogram,
  disabled,
}) {
  const [customIdeogram, setCustomIdeogram] = useState("");

  function handleAdd() {
    if (!customIdeogram) return;
    addCustomIdeogram(customIdeogram);
    setCustomIdeogram("");
  }

  return (
    <div>
      <div className="flex flex-col">
        {Object.keys(defaultIdeograms).map((ideogram) => (
          <Toggle
            name={ideogram}
            checked={defaultIdeograms[ideogram]}
            handleChange={(e) => toggleIdeogram(e.target.id, e.target.checked)}
            disabled={disabled}
            key={ideogram}
          />
        ))}
      </div>

      {customIdeograms.length > 0 && (
        <div className="mt-3 mb-1">
          {customIdeograms.map((ideogram) => (
            <Badge name={ideogram} onRemove={removeIdeogram} key={ideogram} />
          ))}
        </div>
      )}

      <div className="relative mt-3 max-w-[240px]">
        <input
          type="input"
          id="newIdeogram"
          placeholder="Add ideogram"
          className="w-full rounded-md border border-hairline bg-paper py-2.5 pr-10 pl-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          value={customIdeogram}
          onChange={(e) => setCustomIdeogram(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) handleAdd();
          }}
          disabled={disabled}
        />
        <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
          <button
            type="button"
            className="rounded-full bg-ink p-0.5 text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            onClick={handleAdd}
            aria-label="Add ideogram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}

export default IdeogramSettings;
