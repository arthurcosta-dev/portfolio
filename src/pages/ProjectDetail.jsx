import { useParams } from "react-router";
import ProjectPreview from "../components/projects/ProjectPreview";
import RepoDescription from "../components/projects/RepoDescription";
import RepoLinks from "../components/projects/RepoLinks";
import RepoStats from "../components/projects/RepoStats";
import RepoTopics from "../components/projects/RepoTopics";
import ReposError from "../components/projects/ReposError";
import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";
import TextLink from "../components/ui/TextLink";
import usePageTitle from "../hooks/usePageTitle";
import useRepo from "../hooks/useRepo";

const DetailSkeleton = () => (
  <div role="status" aria-label="Carregando projeto" className="space-y-5">
    <Skeleton className="h-14 w-3/5" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="aspect-[2/1] w-full" />
  </div>
);

const RepoDetails = ({ repo }) => (
  <article className="flex flex-col gap-5">
    <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] font-light tracking-[-0.03em] [overflow-wrap:anywhere]">
      {repo.name}
    </h1>
    <RepoDescription
      description={repo.description}
      className="max-w-[60ch] text-lg leading-normal"
    />
    <RepoTopics topics={repo.topics} />
    <RepoStats repo={repo} />
    <RepoLinks repo={repo} showDetailsLink={false} />
    <ProjectPreview name={repo.name} />
  </article>
);

const ProjectDetail = () => {
  const { nome } = useParams();
  const { data: repo, isPending, isError, error, refetch } = useRepo(nome);
  usePageTitle(repo?.name ?? nome);

  return (
    <div className="mx-auto max-w-[960px] px-6 pt-4 pb-[72px] md:px-10 lg:pb-24">
      <p className="mb-4 text-[15px]">
        <TextLink to="/projetos">Todos os projetos</TextLink>
      </p>
      {isPending && <DetailSkeleton />}
      {isError && <ReposError error={error} onRetry={refetch} />}
      {!isPending && !isError && !repo && (
        <EmptyState title="Projeto não encontrado.">
          <p className="text-texto-suave text-base">
            Não há repositório público chamado “{nome}” neste portfólio.
          </p>
        </EmptyState>
      )}
      {repo && <RepoDetails repo={repo} />}
    </div>
  );
};

export default ProjectDetail;
