const CONTROL =
  "bg-input text-texto placeholder:text-placeholder rounded-campo w-full border px-4 text-base";

const FormField = ({ id, label, error, multiline = false, ...props }) => {
  const Control = multiline ? "textarea" : "input";
  const errorId = `${id}-erro`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Control
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${CONTROL} ${multiline ? "h-35 resize-none py-3.5" : "h-13"} ${error ? "border-erro" : "border-borda"}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-erro flex items-center gap-2 text-sm">
          <svg
            aria-hidden="true"
            className="size-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5M12 16.5h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
