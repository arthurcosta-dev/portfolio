import useRepos from "./useRepos";

const MAX_FEATURED = 3;

// Sem destaques escolhidos, entram os repositórios atualizados mais recentemente.
const useFeatured = () => {
  const { data, isPending, isError, error, refetch } = useRepos();

  return {
    repos: data?.slice(0, MAX_FEATURED) ?? [],
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFeatured;
