import { getSafeHomepage } from "../../utils/repos";
import TextLink from "../ui/TextLink";

const RepoLinks = ({ repo, showDetailsLink = true }) => {
  const homepage = getSafeHomepage(repo);

  return (
    <div className="flex flex-wrap items-center gap-x-5 text-[15px]">
      {showDetailsLink && (
        <TextLink to={`/projetos/${repo.name}`}>Ver projeto</TextLink>
      )}
      {homepage && <TextLink href={homepage}>Abrir site</TextLink>}
      <TextLink href={repo.html_url}>Ver no GitHub</TextLink>
    </div>
  );
};

export default RepoLinks;
