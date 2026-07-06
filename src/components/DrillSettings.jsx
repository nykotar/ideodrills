import Toggle from "./Toggle";

const fieldClass =
  "w-full rounded-md border border-hairline bg-paper text-ink text-sm p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-40";
const labelClass = "block mb-2 text-xs tracking-widest uppercase text-muted";

function DrillSettings({ settings, handleChange, disabled }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="voice" className={labelClass}>
            Voice
          </label>
          <select id="voice" className={fieldClass} value={settings.voice} onChange={handleChange} disabled={disabled}>
            <option value="">Choose a voice</option>
            {settings.voices.map((voice, i) => (
              <option value={i} key={i}>
                {voice.lang} - {voice.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="speed" className={labelClass}>
            Speed
          </label>
          <select id="speed" className={fieldClass} value={settings.speed} onChange={handleChange} disabled={disabled}>
            <option value={3}>Slow</option>
            <option value={2}>Medium</option>
            <option value={1}>Fast</option>
            <option value={0.5}>Very fast</option>
            <option value={0.2}>Faster</option>
          </select>
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>
            Time (minutes)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={settings.time}
            id="time"
            className={fieldClass}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="mt-3">
        <Toggle
          name="Display ideogram"
          id="displayIdeogram"
          checked={settings.displayIdeogram}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}

export default DrillSettings;
