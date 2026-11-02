import { Link } from "react-router";

const BASE =
  "inline-flex h-13 cursor-pointer items-center justify-center gap-3 rounded-botao px-7 text-base font-medium disabled:cursor-not-allowed";

const VARIANTS = {
  primary:
    "bg-acento text-sobre-acento hover:bg-acento-hover disabled:bg-desabilitado",
  outline:
    "border border-borda-forte text-texto hover:border-borda-hover disabled:text-texto-suave disabled:hover:border-borda-forte",
};

const Button = ({
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
