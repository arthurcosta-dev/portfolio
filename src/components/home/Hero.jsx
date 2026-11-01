import { SITE } from "../../config/site";
import Button from "../ui/Button";
import TextLink from "../ui/TextLink";

const Hero = () => {
  const [firstName, lastName] = SITE.name.split(" ");

  return (
    <section className="relative mx-auto flex min-h-[636px] max-w-[1360px] flex-col justify-between gap-16 overflow-hidden px-6 pt-9 pb-10 md:min-h-[700px] md:px-10 md:pt-14 md:pb-[72px] lg:px-20">
      <div
        aria-hidden="true"
        className="absolute top-[21%] left-[-28%] aspect-[620/170] w-[159%] -rotate-14 md:top-[29%] md:left-[14.7%] md:aspect-[1000/260] md:w-[73.5%] md:-rotate-12"
      >
        <div className="border-borda-hover size-full rounded-[50%] border-[1.2px]" />
        <div className="orbit-dot" />
      </div>

      <h1 className="relative z-10 font-serif text-[clamp(5.75rem,13vw,11rem)] leading-[0.88] font-light tracking-[-0.045em]">
        {firstName}
        <br />
        {lastName}
      </h1>

      <div className="relative z-10 md:w-[400px] md:self-end">
        <p className="text-texto-2 text-[19px] leading-[1.45] md:text-[21px]">
          Desenvolvedor front-end em formação, procurando estágio em
          desenvolvimento web.
        </p>
        <div className="mt-6 flex flex-col gap-3 md:mt-7 md:flex-row md:items-center md:gap-7">
          <Button to="/#projetos">Ver projetos</Button>
          <Button to="/#contato" variant="outline" className="md:hidden">
            Falar comigo
          </Button>
          <span className="hidden md:block">
            <TextLink to="/#contato">Falar comigo</TextLink>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
