function Badge(props) {
  return (
    <strong className="inline-flex items-center rounded-full border border-black border-current px-5 py-1.5 text-sm font-medium tracking-wide text-black m-1">
      {props.name}
      <button
        className="ml-2.5 -mr-2.5 rounded-full bg-black text-white p-1 transition-opacity hover:opacity-75 focus:outline-none focus:ring"
        type="button"
        onClick={() => props.onRemove(props.name)}
      >
        <span className="sr-only">Remove</span>

        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </strong>
  );
}

export default Badge;
