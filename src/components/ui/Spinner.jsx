const Spinner = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-block size-4.5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none ${className}`}
  />
);

export default Spinner;
