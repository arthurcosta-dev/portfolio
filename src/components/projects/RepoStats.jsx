import { formatDate } from "../../utils/formatDate";
import { pluralize } from "../../utils/pluralize";
import RepoLanguage from "./RepoLanguage";

const RepoStats = ({ repo }) => (
  <div className="text-texto-suave flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
    <RepoLanguage language={repo.language} />
    <span>{pluralize(repo.stargazers_count, "estrela", "estrelas")}</span>
    <span>{pluralize(repo.forks_count, "fork", "forks")}</span>
    <span>Atualizado em {formatDate(repo.updated_at)}</span>
  </div>
);

export default RepoStats;
