import sky1200 from "../../assets/sobre-ceu-1200.webp";
import sky600 from "../../assets/sobre-ceu-600.webp";

// WebP em dois tamanhos: o celular baixa o de 600 px (5 KB), a tela grande o de 1200 px.
const SkyIllustration = ({ className = "" }) => (
  <img
    src={sky600}
    srcSet={`${sky600} 600w, ${sky1200} 1200w`}
    sizes="(min-width: 1024px) 560px, calc(100vw - 104px)"
    width="1200"
    height="400"
    loading="lazy"
    decoding="async"
    alt="Ilustração de um céu noturno com uma órbita e a curva de um planeta no horizonte"
    className={`block h-auto w-full overflow-hidden ${className}`}
  />
);

export default SkyIllustration;
