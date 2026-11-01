import { Link } from "react-router";
import { formatDate } from "../../utils/formatDate";
import Card from "../ui/Card";
import RepoDescription from "./RepoDescription";
import RepoLanguage from "./RepoLanguage";
import RepoLinks from "./RepoLinks";
import RepoStats from "./RepoStats";
import RepoTopics from "./RepoTopics";

const LargeCard = ({ repo, className }) => (
  <Card
    as="article"
    className={`rounded-card-lg flex min-h-[320px] flex-col gap-4 p-5 lg:gap-5 lg:p-8 ${className}`}
  >
    <h3 className="font-serif text-[34px] leading-[1.2] font-light tracking-[-0.02em] [overflow-wrap:anywhere] lg:text-[40px]">
      <Link to={`/projetos/${repo.name}`} className="hover:text-acento-claro">
        {repo.name}
      </Link>
    </h3>
    <RepoDescription
      description={repo.description}
      className="line-clamp-3 max-w-[540px] text-base leading-normal lg:text-[17px]"
    />
    <RepoTopics topics={repo.topics} limit={5} />
    <div className="mt-auto flex flex-col gap-3 pt-2">
      <RepoStats repo={repo} />
      <RepoLinks repo={repo} />
    </div>
  </Card>
);

const SmallCard = ({ repo, className }) => (
  <Card
    as="article"
    variant="outline"
    className={`rounded-card-md hover:border-borda-hover relative flex min-h-[168px] flex-col justify-between gap-4 p-[22px] lg:p-7 ${className}`}
  >
    <div>
      <h3 className="font-serif text-[26px] leading-[1.2] font-light tracking-[-0.01em] [overflow-wrap:anywhere] lg:text-[28px]">
        <Link
          to={`/projetos/${repo.name}`}
          className="after:absolute after:inset-0 after:rounded-card-md"
        >
          {repo.name}
        </Link>
      </h3>
      <RepoDescription
        description={repo.description}
        className="mt-2 line-clamp-2 text-[15px] leading-normal lg:mt-2.5 lg:text-base"
      />
    </div>
    <div className="text-texto-suave flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-sm">
      <RepoLanguage language={repo.language} />
      <span>Atualizado em {formatDate(repo.updated_at)}</span>
    </div>
  </Card>
);

const ProjectCard = ({ repo, size = "small", className = "" }) =>
  size === "large" ? (
    <LargeCard repo={repo} className={className} />
  ) : (
    <SmallCard repo={repo} className={className} />
  );

export default ProjectCard;
