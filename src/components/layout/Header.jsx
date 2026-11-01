import { useState } from "react";
import { Link } from "react-router";
import { SITE } from "../../config/site";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_LINKS = [
  { to: "/#projetos", label: "Projetos" },
  { to: "/#sobre", label: "Sobre" },
  { to: "/#contato", label: "Contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      onKeyDown={(event) => event.key === "Escape" && closeMenu()}
      className="relative z-20 mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between pr-3 pl-6 md:h-24 md:px-10 lg:px-20"
    >
      <Link
        to="/"
        onClick={closeMenu}
        className="inline-flex min-h-11 items-center font-serif text-[22px] tracking-[-0.01em] md:text-2xl"
      >
        {SITE.name.toLowerCase()}
      </Link>

      <nav
        aria-label="Principal"
        className="text-texto-suave hidden items-center gap-9 text-[15px] md:flex"
      >
        {NAV_LINKS.map(({ to, label }) => (
          <Link key={to} to={to} className="hover:text-texto">
            {label}
          </Link>
        ))}
        <ThemeToggle className="border-borda border" />
      </nav>

      <div className="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-celular"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-texto inline-flex size-11 cursor-pointer items-center justify-center rounded-full"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={isMenuOpen ? "M6 6l12 12M18 6 6 18" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="menu-celular"
          aria-label="Celular"
          className="bg-superficie border-borda rounded-card-md absolute top-full right-6 left-6 border p-2 md:hidden"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className="hover:bg-linha-hover flex min-h-11 items-center rounded-campo px-4 text-base"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
