import { findRepoByName } from "../utils/repos";
import useFeaturedNames from "./useFeaturedNames";
import useRepos from "./useRepos";

const MAX_FEATURED = 3;

// Sem destaques escolhidos, ou se o Supabase falhar, entram os atualizados mais recentemente.
const useFeatured = () => {
  const { data, isPending, isError, error, refetch } = useRepos();
  const featured = useFeaturedNames();

  const repos = data ?? [];
  const chosen = (featured.data ?? [])
    .map((name) => findRepoByName(repos, name))
    .filter(Boolean);

  return {
    repos: (chosen.length > 0 ? chosen : repos).slice(0, MAX_FEATURED),
    isPending: isPending || featured.isPending,
    isError,
    error,
    refetch,
  };
};

export default useFeatured;
