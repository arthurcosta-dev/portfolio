const Skeleton = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`bg-superficie-2 animate-pulse rounded-md motion-reduce:animate-none ${className}`}
  />
);

export default Skeleton;
