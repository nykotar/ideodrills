import Header from "./components/Header";
import IdeogramSettings from "./components/IdeogramSettings";
import DrillSettings from "./components/DrillSettings";
import SessionView from "./components/SessionView";
import Faq from "./components/Faq";
import { useIdeograms } from "./hooks/useIdeograms";
import { useSettings } from "./hooks/useSettings";
import { useDrill } from "./hooks/useDrill";

const eyebrowClass = "text-xs tracking-widest uppercase text-muted mb-3";

function App() {
  const {
    defaultIdeograms,
    customIdeograms,
    enabledIdeograms,
    toggleIdeogram,
    addCustomIdeogram,
    removeIdeogram,
  } = useIdeograms();

  const { settings, handleChange } = useSettings();

  const { isRunning, currentIdeogram, ideogramRef, minutes, seconds, start, stop } =
    useDrill(settings);

  const hasVoice = Boolean(settings.voice);
  const startBlockedReason =
    enabledIdeograms.length === 0
      ? "Select or add at least one ideogram."
      : !hasVoice && !settings.displayIdeogram
      ? "Select a voice or enable Display ideogram."
      : null;
  const runsSilently = !startBlockedReason && !hasVoice && settings.displayIdeogram;

  if (isRunning) {
    return (
      <SessionView
        displayIdeogram={settings.displayIdeogram}
        currentIdeogram={currentIdeogram}
        ideogramRef={ideogramRef}
        minutes={minutes}
        seconds={seconds}
        onStop={stop}
      />
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className={eyebrowClass}>Ideograms</h2>
            <IdeogramSettings
              defaultIdeograms={defaultIdeograms}
              toggleIdeogram={toggleIdeogram}
              customIdeograms={customIdeograms}
              addCustomIdeogram={addCustomIdeogram}
              removeIdeogram={removeIdeogram}
              disabled={isRunning}
            />
          </div>

          <div>
            <h2 className={eyebrowClass}>Settings</h2>
            <DrillSettings settings={settings} handleChange={handleChange} disabled={isRunning} />
          </div>
        </div>

        <button
          className="mt-10 w-full sm:w-auto rounded bg-ink text-paper py-3 px-10 text-sm uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => start(enabledIdeograms)}
          disabled={Boolean(startBlockedReason)}
        >
          Start drill
        </button>
        {startBlockedReason && <p className="mt-3 text-xs text-muted">{startBlockedReason}</p>}
        {runsSilently && (
          <p className="mt-3 text-xs text-muted">No voice selected — the drill will run silently.</p>
        )}

        <Faq />
      </main>
    </>
  );
}

export default App;
