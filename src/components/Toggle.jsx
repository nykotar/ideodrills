function Toggle(props) {
  return (
    <label
      htmlFor={props.id || props.name}
      className="inline-flex relative items-center cursor-pointer m-2"
    >
      <input
        type="checkbox"
        value=""
        id={props.id || props.name}
        className="sr-only peer"
        defaultChecked={props.checked}
        onChange={(e) => props.handleChange(e)}
        disabled={props.disabled}
      />
      <div className="w-11 h-6 rounded-full border border-hairline bg-paper peer-checked:bg-ink transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-ink after:border after:border-hairline after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-paper peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper peer-disabled:opacity-40"></div>
      <span className="ml-3 text-sm text-ink">{props.name}</span>
    </label>
  );
}

export default Toggle;
