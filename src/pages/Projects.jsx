import ProjectRow from "../components/projects/ProjectRow";
import ProjectRowSkeleton from "../components/projects/ProjectRowSkeleton";
import ReposError from "../components/projects/ReposError";
import EmptyState from "../components/ui/EmptyState";
import { SITE } from "../config/site";
import usePageTitle from "../hooks/usePageTitle";
import useRepos from "../hooks/useRepos";

const SKELETON_ROWS = [1, 2, 3, 4, 5];

const RowList = ({ children, ...props }) => (
  <div className="border-borda mt-8 border-b lg:mt-12" {...props}>
    {children}
  </div>
);

const ProjectsContent = () => {
  const { data: repos, isPending, isError, error, refetch } = useRepos();

  if (isPending) {
    return (
      <RowList role="status" aria-label="Carregando projetos">
        {SKELETON_ROWS.map((row) => (
          <ProjectRowSkeleton key={row} />
        ))}
      </RowList>
    );
  }
  if (isError) {
    return (
      <div className="mt-8 lg:mt-12">
        <ReposError error={error} onRetry={refetch} />
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
  return (
    <RowList>
      {repos.map((repo) => (
        <ProjectRow key={repo.id} repo={repo} />
      ))}
    </RowList>
  );
};

const Projects = () => {
  usePageTitle("Projetos");

  return (
    <div className="mx-auto max-w-[1360px] px-6 pt-10 pb-[72px] md:px-10 lg:px-20 lg:pb-24">
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="font-serif text-[44px] leading-[1.05] font-light tracking-[-0.03em] lg:text-[56px]">
          Projetos
        </h1>
        <p className="text-texto-suave text-[15px]">
          Lidos direto do GitHub de {SITE.githubUser}.
        </p>
      </div>
      <ProjectsContent />
    </div>
  );
};

export default Projects;
