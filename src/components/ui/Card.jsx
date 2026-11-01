const VARIANTS = {
  filled: "bg-superficie border border-borda-card",
  field: "bg-superficie border border-borda",
  raised: "bg-superficie-2",
  outline: "border border-borda",
  accent: "bg-acento text-sobre-acento",
};

const Card = ({
  as: Element = "div",
  variant = "filled",
  className = "",
  children,
}) => (
  <Element className={`${VARIANTS[variant]} ${className}`}>{children}</Element>
);

export default Card;
