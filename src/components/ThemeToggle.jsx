function ThemeToggle({ theme, onToggle }) {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={onToggle}
        aria-label="Toggle dark mode"
      />
      <div className="w-11 h-6 rounded-full border border-hairline bg-paper peer-checked:bg-ink transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-ink after:border after:border-hairline after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-paper peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper"></div>
      <span className="ml-2 text-xs tracking-wide text-muted uppercase">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </label>
  );
}

export default ThemeToggle;
