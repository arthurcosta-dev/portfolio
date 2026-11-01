const Switch = ({ checked, label, ...props }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed"
    {...props}
  >
    <span
      aria-hidden="true"
      className={`relative h-6 w-10 rounded-full border ${checked ? "bg-acento border-acento" : "border-borda-forte"}`}
    >
      <span
        className={`absolute top-0.5 size-[18px] rounded-full ${checked ? "bg-sobre-acento left-[18px]" : "bg-texto-suave left-0.5"}`}
      />
    </span>
  </button>
);

export default Switch;
