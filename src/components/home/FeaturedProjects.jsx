import { SITE } from "../../config/site";
import useFeatured from "../../hooks/useFeatured";
import ProjectCard from "../projects/ProjectCard";
import ProjectCardSkeleton from "../projects/ProjectCardSkeleton";
import ReposError from "../projects/ReposError";
import EmptyState from "../ui/EmptyState";
import TextLink from "../ui/TextLink";

const GRID =
  "mt-8 grid gap-3 lg:mt-12 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(224px,auto))] lg:gap-4";
const LARGE_POSITION = "lg:col-span-7 lg:row-span-2";
const SMALL_POSITION = "lg:col-span-5 lg:col-start-8";

const FeaturedGrid = ({ repos }) => {
  const [largeRepo, ...smallRepos] = repos;
  const largePosition =
    repos.length === 1 ? "lg:col-span-12 lg:row-span-2" : LARGE_POSITION;
  const smallPosition =
    repos.length === 2 ? `${SMALL_POSITION} lg:row-span-2` : SMALL_POSITION;

  return (
    <div className={GRID}>
      <ProjectCard repo={largeRepo} size="large" className={largePosition} />
      {smallRepos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} className={smallPosition} />
      ))}
    </div>
  );
};

const FeaturedSkeleton = () => (
  <div role="status" aria-label="Carregando projetos" className={GRID}>
    <ProjectCardSkeleton size="large" className={LARGE_POSITION} />
    <ProjectCardSkeleton className={SMALL_POSITION} />
    <ProjectCardSkeleton className={SMALL_POSITION} />
  </div>
);

const FeaturedContent = ({ repos, isPending, isError, error, onRetry }) => {
  if (isPending) {
    return <FeaturedSkeleton />;
  }
  if (isError) {
    return (
      <div className="mt-8 lg:mt-12">
        <ReposError error={error} onRetry={onRetry} />
      </div>
    );
  }
  if (repos.length === 0) {
    return (
      <div className="mt-8 lg:mt-12">
        <EmptyState title="Nenhum projeto público encontrado ainda." />
      </div>
    );
  }
  return <FeaturedGrid repos={repos} />;
};

const FeaturedProjects = () => {
  const { repos, isPending, isError, error, refetch } = useFeatured();

  return (
    <section
      id="projetos"
      className="mx-auto max-w-[1360px] px-6 py-[72px] md:px-10 lg:px-20 lg:py-24"
    >
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-serif text-[44px] leading-[1.05] font-light tracking-[-0.03em] lg:text-[56px]">
          Projetos
        </h2>
        <p className="text-texto-suave text-[15px]">
          Lidos direto do GitHub de {SITE.githubUser}.
        </p>
      </div>

      <FeaturedContent
        repos={repos}
        isPending={isPending}
        isError={isError}
        error={error}
        onRetry={refetch}
      />

      <p className="mt-6 text-base lg:mt-7">
        <TextLink to="/projetos">Ver todos os projetos</TextLink>
      </p>
    </section>
  );
};

export default FeaturedProjects;
