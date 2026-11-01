import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../services/github";

export const REPOS_QUERY_KEY = ["repos"];

const useRepos = () =>
  useQuery({ queryKey: REPOS_QUERY_KEY, queryFn: fetchRepos });

export default useRepos;
