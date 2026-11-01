import Button from "./Button";

const ErrorState = ({ title, message, onRetry }) => (
  <div
    role="alert"
    className="border-borda rounded-card-md flex flex-col items-start gap-3 border p-7"
  >
    <h3 className="font-serif text-[28px] leading-[1.2] font-light tracking-[-0.01em]">
      {title}
    </h3>
    <p className="text-texto-suave max-w-[60ch] text-base leading-normal">
      {message}
    </p>
    {onRetry && (
      <Button onClick={onRetry} className="mt-2">
        Tentar de novo
      </Button>
    )}
  </div>
);

export default ErrorState;
