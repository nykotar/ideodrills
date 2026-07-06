function ChevronIcon() {
  return (
    <svg
      className="ml-1.5 h-4 w-4 flex-shrink-0 text-muted transition duration-300 group-open:-rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Faq() {
  return (
    <div className="mt-10 divide-y divide-hairline border-t border-b border-hairline font-sans">
      <details className="group" open>
        <summary className="flex cursor-pointer items-center justify-between py-4 list-none">
          <h5 className="text-sm tracking-wide uppercase">Instructions</h5>
          <ChevronIcon />
        </summary>

        <div className="pb-4 leading-relaxed text-muted">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select or add your ideograms</li>
            <li>Choose a voice, or turn on Display ideogram to run silently</li>
            <li>Set speed and time</li>
            <li>Start — the screen switches to a distraction-free view until you stop</li>
          </ol>
        </div>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between py-4 list-none">
          <h5 className="text-sm tracking-wide uppercase">There are no voices available. What do I do?</h5>
          <ChevronIcon />
        </summary>

        <div className="pb-4 leading-relaxed text-muted">
          <p>
            If the voice list is empty, it means your device does not support speech
            synthesis. Try using a different device, such as a desktop computer or laptop.
            If you are on Linux you might need to install additional packages.
          </p>
        </div>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between py-4 list-none">
          <h5 className="text-sm tracking-wide uppercase">I see voices on the list, but not in the language I need</h5>
          <ChevronIcon />
        </summary>

        <div className="pb-4 leading-relaxed text-muted">
          <p>
            On Windows you might need to{" "}
            <a
              href="https://support.microsoft.com/en-us/topic/download-voices-for-immersive-reader-read-mode-and-read-aloud-4c83a8d8-7486-42f7-8e46-2b0fdf753130"
              className="underline text-ink"
            >
              install the language pack
            </a>{" "}
            of the desired language. Alternatively, install and use{" "}
            <a href="https://www.google.com/intl/en_us/chrome/" className="underline text-ink">
              Google Chrome
            </a>{" "}
            as it offers the option of using Google Translator for voice synthesis.
          </p>
        </div>
      </details>
    </div>
  );
}

export default Faq;
