import { Link } from "react-router";
import { formatDate } from "../../utils/formatDate";
import RepoDescription from "./RepoDescription";

export const ROW_LAYOUT =
  "border-borda block border-t py-5 md:grid md:grid-cols-[240px_minmax(0,1fr)_150px_170px] md:items-baseline md:gap-6 md:px-4 md:py-6";

const ProjectRow = ({ repo }) => (
  <Link
    to={`/projetos/${repo.name}`}
    className={`hover:bg-linha-hover ${ROW_LAYOUT}`}
  >
    <span className="flex items-baseline justify-between gap-3 md:contents">
      <span className="text-[17px] font-medium [overflow-wrap:anywhere] md:text-lg">
        {repo.name}
      </span>
      <span className="text-texto-suave shrink-0 text-[13px] md:order-last md:text-right md:text-sm">
        {formatDate(repo.updated_at)}
      </span>
    </span>
    <RepoDescription
      description={repo.description}
      className="mt-1.5 text-[15px] leading-[1.45] md:mt-0 md:line-clamp-1 md:text-base"
    />
    <span className="text-texto-suave mt-2 block text-[13px] md:mt-0 md:text-[15px]">
      {repo.language}
    </span>
  </Link>
);

export default ProjectRow;
