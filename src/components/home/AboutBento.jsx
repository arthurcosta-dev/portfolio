import { GITHUB_URL, SITE } from "../../config/site";
import { hasValue } from "../../utils/hasValue";
import Card from "../ui/Card";
import TextLink from "../ui/TextLink";
import AboutProfile from "./AboutProfile";
import SkyIllustration from "./SkyIllustration";

const AboutBento = () => (
  <section
    id="sobre"
    className="mx-auto max-w-[1360px] px-6 py-[72px] md:px-10 lg:px-20 lg:py-24"
  >
    <h2 className="font-serif text-[44px] leading-[1.05] font-light tracking-[-0.03em] lg:text-[56px]">
      Sobre
    </h2>

    <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-12 lg:grid-rows-[minmax(224px,auto)_minmax(224px,auto)_minmax(208px,auto)] lg:gap-4">
      <Card className="rounded-card-lg col-span-2 p-7 lg:col-span-7 lg:row-span-2 lg:flex lg:flex-col lg:rounded-card-xl lg:p-11">
        <p className="font-serif text-[27px] leading-[1.22] font-light tracking-[-0.02em] lg:max-w-[600px] lg:text-[clamp(2rem,2.95vw,2.5rem)] lg:leading-[1.18]">
          {SITE.about.statement}
        </p>
        <p className="text-texto-suave mt-4 text-base leading-normal lg:mt-6 lg:max-w-[520px] lg:text-lg">
          {SITE.about.goal}
        </p>
        <div className="mt-6 lg:mt-auto lg:pt-8">
          <SkyIllustration className="rounded-card-md" />
        </div>
      </Card>

      <Card
        variant="raised"
        className="rounded-card-md flex flex-col justify-between p-5 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:rounded-3xl lg:p-8"
      >
        <h3 className="text-base font-medium lg:text-[17px]">Tecnologias</h3>
        <ul className="mt-3.5 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
          {SITE.about.technologies.map((technology) => (
            <li
              key={technology}
              className="border-borda-forte border-t py-[9px] font-serif text-xl font-light lg:py-3 lg:text-2xl"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="rounded-card-md flex flex-col justify-between gap-4 p-5 lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:p-7">
        <div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="stroke-acento-claro shrink-0"
            >
              <circle cx="6" cy="5" r="2.2" />
              <circle cx="6" cy="19" r="2.2" />
              <circle cx="18" cy="8" r="2.2" />
              <path d="M6 7.2v9.6M18 10.2c0 4-6 3-11 7" />
            </svg>
            <h3 className="text-[15px] font-medium [overflow-wrap:anywhere] lg:font-serif lg:text-[26px] lg:font-light lg:tracking-[-0.01em]">
              {SITE.githubUser}
            </h3>
          </div>
          <p className="text-texto-suave mt-2 text-sm leading-[1.45] lg:mt-4 lg:text-[15px]">
            {SITE.about.github}
          </p>
        </div>
        <p className="text-[15px]">
          <TextLink href={GITHUB_URL}>Abrir GitHub</TextLink>
        </p>
      </Card>

      <AboutProfile />

      <Card
        variant="accent"
        className="col-span-2 rounded-[26px] p-[26px] lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:flex lg:flex-col lg:justify-center lg:rounded-card-lg lg:px-9 lg:py-8"
      >
        <h3 className="font-serif text-[28px] leading-[1.2] tracking-[-0.01em] lg:text-[30px]">
          Contato rápido
        </h3>
        <p className="text-sobre-acento mt-2 text-base">{SITE.contact.quick}</p>
        <p className="mt-3 flex flex-wrap gap-x-6 text-[15px]">
          {hasValue(SITE.email) && (
            <TextLink tone="accent" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </TextLink>
          )}
          {hasValue(SITE.linkedinUrl) && (
            <TextLink tone="accent" href={SITE.linkedinUrl}>
              LinkedIn
            </TextLink>
          )}
        </p>
      </Card>
    </div>
  </section>
);

export default AboutBento;
