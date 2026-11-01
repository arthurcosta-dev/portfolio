import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../services/github";
import { findRepoByName } from "../utils/repos";
import { REPOS_QUERY_KEY } from "./useRepos";

// Mesma chave da lista: abrir um projeto reaproveita o que já foi baixado.
const useRepo = (name) =>
  useQuery({
    queryKey: REPOS_QUERY_KEY,
    queryFn: fetchRepos,
    select: (repos) => findRepoByName(repos, name),
  });

export default useRepo;
