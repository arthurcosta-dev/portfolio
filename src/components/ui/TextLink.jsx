import { Link } from "react-router";

const BASE =
  "inline-flex min-h-11 items-center underline decoration-1 underline-offset-4";

const TONES = {
  default: "hover:text-acento-claro",
  accent: "hover:decoration-2",
};

const TextLink = ({
  to,
  href,
  tone = "default",
  className = "",
  children,
  ...props
}) => {
  const classes = `${BASE} ${TONES[tone]} ${className}`;

  return to ? (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  ) : (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
};

export default TextLink;
