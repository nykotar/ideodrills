function SessionView({ displayIdeogram, currentIdeogram, ideogramRef, minutes, seconds, onStop }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-paper px-4">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-muted sm:left-auto sm:right-6 sm:translate-x-0">
        Session
      </div>

      {displayIdeogram && (
        <p
          className="font-semibold text-4xl sm:text-6xl text-center break-words max-w-full"
          ref={ideogramRef}
        >
          {currentIdeogram}
        </p>
      )}

      <p className="mt-8 text-2xl tabular-nums text-muted">
        {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </p>

      <button
        className="mt-10 rounded border border-ink py-3 px-10 text-sm uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        onClick={onStop}
      >
        Stop
      </button>
    </div>
  );
}

export default SessionView;
