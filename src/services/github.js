import { SITE } from "../config/site";
import { filterPortfolioRepos } from "../utils/repos";

const REPOS_URL = `https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=updated`;

export class GitHubError extends Error {
  constructor(status) {
    super(`GitHub respondeu ${status}`);
    this.name = "GitHubError";
    this.isRateLimit = status === 403 || status === 429;
  }
}

// Uma única requisição traz todos os campos usados nos cards e nas páginas.
export const fetchRepos = async () => {
  const response = await fetch(REPOS_URL);

  if (!response.ok) {
    throw new GitHubError(response.status);
  }

  return filterPortfolioRepos(await response.json(), SITE.githubUser);
};
