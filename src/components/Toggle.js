function Toggle(props) {
  return (
    <label
      htmlFor={props.name}
      className="inline-flex relative items-center cursor-pointer m-2"
    >
      <input
        type="checkbox"
        value=""
        id={props.name}
        className="sr-only peer"
        defaultChecked={props.checked}
        onChange={(e) => props.handleChange(e)}
        disabled={props.disabled}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
      <span className="ml-3 text-sm font-medium text-gray-900">
        {props.name}
      </span>
    </label>
  );
}

export default Toggle;
