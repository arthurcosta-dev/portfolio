import { Link } from "react-router";

const BASE =
  "hover:text-acento-claro inline-flex min-h-11 items-center underline decoration-1 underline-offset-4";

const TextLink = ({ to, href, className = "", children, ...props }) => {
  const classes = `${BASE} ${className}`;

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
