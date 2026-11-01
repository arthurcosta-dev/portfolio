import { Link } from "react-router";
import { GITHUB_URL, SITE } from "../../config/site";
import { hasValue } from "../../utils/hasValue";

const LINK_CLASSES = "hover:text-texto inline-flex min-h-11 items-center";

const Footer = () => (
  <footer className="text-texto-suave border-borda-card mx-auto flex w-full max-w-[1360px] flex-col-reverse gap-3 border-t px-6 pt-8 pb-11 text-sm md:flex-row md:items-center md:justify-between md:px-10 lg:px-20">
    <p>© 2026 {SITE.name}</p>
    <nav aria-label="Rodapé" className="flex flex-wrap gap-x-7 gap-y-2">
      <a href={GITHUB_URL} className={LINK_CLASSES}>
        GitHub
      </a>
      {hasValue(SITE.linkedinUrl) && (
        <a href={SITE.linkedinUrl} className={LINK_CLASSES}>
          LinkedIn
        </a>
      )}
      <Link to="/login" className={LINK_CLASSES}>
        Entrar
      </Link>
    </nav>
  </footer>
);

export default Footer;
