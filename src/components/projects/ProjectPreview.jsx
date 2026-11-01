import { useState } from "react";
import { SITE } from "../../config/site";

// Imagem gerada pelo GitHub. Se ela falhar, a página segue sem pré-visualização.
const ProjectPreview = ({ name }) => {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return null;
  }

  return (
    <img
      src={`https://opengraph.githubassets.com/1/${SITE.githubUser}/${name}`}
      alt={`Pré-visualização do repositório ${name} no GitHub`}
      width="1200"
      height="600"
      loading="lazy"
      decoding="async"
      onError={() => setHasFailed(true)}
      className="border-borda-card rounded-card-md bg-superficie h-auto w-full border"
    />
  );
};

export default ProjectPreview;
