import "./App.css";

import { FaGithub, FaDiscord, FaReddit } from "react-icons/fa";
import { useState, useEffect } from "react";
import Toggle from "./components/Toggle";
import Badge from "./components/Badge";
import { useTimer } from "react-timer-hook";

function App() {
  const [defaultIdeograms, setDefaultIdeograms] = useState({
    Biological: true,
    Land: true,
    Manmade: true,
    "Motion/Energy": true,
    Natural: true,
    "Space/Air": true,
    Water: true,
  });

  // Handle toggles
  function handleToggleChange(e) {
    const { id, checked } = e.target;
    setDefaultIdeograms({ ...defaultIdeograms, [id]: checked });
  }

  // Custom ideograms
  const [customIdeograms, setCustomIdeograms] = useState([]);
  const [customIdeogram, setCustomIdeogram] = useState("");

  function addCustomIdeogram() {
    if (!customIdeogram) return;

    const ideogram =
      customIdeogram.charAt(0).toUpperCase() +
      customIdeogram.toLowerCase().slice(1);
    if (
      !customIdeograms.includes(ideogram) &&
      !Object.keys(defaultIdeograms).includes(ideogram)
    ) {
      setCustomIdeograms([...customIdeograms, ideogram]);
    }
    setCustomIdeogram("");
  }

  function removeIdeogram(name) {
    setCustomIdeograms(
      customIdeograms.filter((ideogram) => {
        return ideogram !== name;
      })
    );
  }

  // Settings

  const [settings, setSettings] = useState({
    voices: [],
    voice: null,
    speed: 2,
    time: 2,
  });

  function handleChange(e) {
    setSettings({ ...settings, [e.target.id]: e.target.value });
  }

  // Load voices
  useEffect(() => {
    setSettings({ ...settings, voices: speechSynthesis.getVoices() });
    speechSynthesis.onvoiceschanged = () => {
      setSettings({ ...settings, voices: speechSynthesis.getVoices() });
    };
  }, []);

  const [speechInterval, setSpeechInterval] = useState(null);

  const { minutes, seconds, isRunning, pause, restart } = useTimer({
    expiryTimestamp: 1,
    onExpire: () => clearInterval(speechInterval),
  });

  function startDrill() {
    if (!settings.voice) return;

    const ideograms = [
      ...customIdeograms,
      ...Object.keys(defaultIdeograms).filter((k) => defaultIdeograms[k]),
    ];

    const time = new Date();
    time.setSeconds(time.getSeconds() + Number(settings.time) * 60);
    restart(time);

    setSpeechInterval(
      setInterval(() => {
        speechSynthesis.cancel();
        let utterance = new SpeechSynthesisUtterance(
          ideograms[Math.floor(Math.random() * ideograms.length)].replace(
            "/",
            " "
          )
        );
        utterance.voice = settings.voices[settings.voice];
        speechSynthesis.speak(utterance);
      }, parseFloat(settings.speed * 1000))
    );
  }

  function stopDrill() {
    clearInterval(speechInterval);
    pause();
  }

  return (
    <>
      <header>
        <nav className="mx-auto flex max-w-3xl items-center justify-between p-4">
          <a
            className="inline-flex h-10 p-2 items-center justify-center rounded-lg bg-gray-100 font-semibold"
            href="/"
          >
            IdeoDrills
          </a>
          <ul className="flex items-center gap-6 text-2xl">
            <li>
              <a href='https://ko-fi.com/V7V53DIM0' target='_blank'><img height='36' style={{border:'0px',height:'36px'}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
            </li>
            <li>
              <a href="https://github.com/nykotar/ideodrills">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="https://discord.gg/remoteviewing">
                <FaDiscord />
              </a>
            </li>
            <li>
              <a href="https://reddit.com/r/remoteviewing">
                <FaReddit />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex my-7 flex-col items-center">
        <div className="bg-gray-100 rounded-lg p-4 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
          <h1 className="text-xl font-medium">Ideograms</h1>
          <div className="mt-3 sm:flex">
            <div className="flex flex-col sm:mr-12">
              {Object.keys(defaultIdeograms).map((ideogram, i) => {
                return (
                  <Toggle
                    name={ideogram}
                    checked={defaultIdeograms[ideogram]}
                    handleChange={handleToggleChange}
                    disabled={isRunning}
                    key={i}
                  />
                );
              })}
            </div>
            <div className="m-2 sm:m-0">
              <div className="mb-2">
                {customIdeograms.map((ideogram, i) => {
                  return (
                    <Badge name={ideogram} onRemove={removeIdeogram} key={i} />
                  );
                })}
              </div>
              <div className="relative sm:max-w-[240px]">
                <input
                  type="input"
                  id="newIdeogram"
                  placeholder="Add ideogram"
                  className="w-full rounded-md border-gray-200 py-2.5 pr-10 pl-2.5 shadow-sm"
                  value={customIdeogram}
                  onChange={(e) => setCustomIdeogram(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) addCustomIdeogram();
                  }}
                  disabled={isRunning}
                />
                <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
                  <button
                    type="button"
                    className="rounded-full bg-black p-0.5 text-white"
                    onClick={addCustomIdeogram}
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
          </div>
          <h1 className="text-xl font-medium mt-4">Settings</h1>
          <div className="mt-3 mx-2 sm:flex sm:justify-between">
            <div className="sm:w-1/4">
              <label
                htmlFor="voice"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Voice
              </label>
              <select
                id="voice"
                className="text-gray-900 text-sm rounded-lg p-2.5 w-full"
                onChange={handleChange}
                disabled={isRunning}
              >
                <option selected>Choose a voice</option>
                {settings.voices.map((voice, i) => {
                  return (
                    <option value={i} key={i}>
                      {voice.lang} - {voice.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mt-2 sm:mt-0 sm:w-1/4">
              <label
                htmlFor="speed"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Speed
              </label>
              <select
                id="speed"
                className="text-gray-900 text-sm rounded-lg p-2.5 w-full"
                onChange={handleChange}
                defaultValue={settings.speed}
                disabled={isRunning}
              >
                <option value={3}>Slow</option>
                <option value={2}>Medium</option>
                <option value={1.5}>Fast</option>
              </select>
            </div>
            <div className="mt-2 sm:mt-0 sm:w-1/4">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Time (minutes)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                defaultValue={settings.time}
                id="time"
                className="rounded-md border-gray-200 shadow-sm text-sm p-2.5 w-full"
                onChange={handleChange}
                disabled={isRunning}
              />
            </div>
          </div>
          {isRunning && (
            <div className="mt-5">
              <p className="text-center font-mono font-semibold text-5xl">
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </p>
            </div>
          )}
          <div className="mt-5">
            {!isRunning && (
              <button
                className="rounded text-white bg-black py-3 px-10 text-sm font-medium uppercase tracking-wide"
                onClick={startDrill}
              >
                Start
              </button>
            )}
            {isRunning && (
              <button
                className="rounded text-black bg-transparent border-black border-2 py-3 px-10 text-sm font-medium uppercase tracking-wide"
                onClick={stopDrill}
              >
                Stop
              </button>
            )}
          </div>
        </div>
        <div className="space-y-4 mt-4 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium">Instructions</h5>

              <svg
                className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="mt-4 mx-4 px-4 leading-relaxed text-gray-800">
              <ol className="list-decimal">
                <li>Select/add your ideograms</li>
                <li>Select voice</li>
                <li>Set speed and time</li>
                <li>Start</li>
              </ol>
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium">
                There are no voices available. What do I do?
              </h5>

              <svg
                className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="mt-4 px-4 leading-relaxed text-gray-800">
              <p>
                If the voice list is empty, it means your devide does not
                support speech synthesis. Try using a different device, such as
                a desktop computer or laptop. If you are on Linux you might need
                to install aditional packages.
              </p>
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium">
                I see voices on the list, but not in the language I need
              </h5>

              <svg
                className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="mt-4 px-4 leading-relaxed text-gray-800">
              <p>
                On Windows you might need to{" "}
                <a
                  href="https://support.microsoft.com/en-us/topic/download-voices-for-immersive-reader-read-mode-and-read-aloud-4c83a8d8-7486-42f7-8e46-2b0fdf753130"
                  className="underline"
                >
                  install the language pack
                </a>{" "}
                of the desired language. Alternatively, install and use{" "}
                <a
                  href="https://www.google.com/intl/en_us/chrome/"
                  className="underline"
                >
                  Google Chrome
                </a>{" "}
                as it offers the option of using Google Translator for voice
                synthesis.
              </p>
            </div>
          </details>
        </div>
      </main>
    </>
  );
}

export default App;
