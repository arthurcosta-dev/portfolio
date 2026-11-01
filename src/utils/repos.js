// Fica de fora: fork, arquivado e o repositório de perfil, que tem o nome do usuário.
export const filterPortfolioRepos = (repos, githubUser) =>
  repos.filter(
    (repo) => !repo.fork && !repo.archived && repo.name !== githubUser,
  );

export const findRepoByName = (repos, name) =>
  repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase());

// O campo homepage é texto livre no GitHub: só vira link se for http ou https.
export const getSafeHomepage = (repo) =>
  /^https?:\/\//i.test(repo.homepage ?? "") ? repo.homepage : null;
