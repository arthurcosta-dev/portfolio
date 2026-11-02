import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedNames } from "../services/featured";

export const FEATURED_QUERY_KEY = ["featured"];

// Sem repetir: se o Supabase falhar, a home segue logo com os mais recentes.
const useFeaturedNames = () =>
  useQuery({
    queryKey: FEATURED_QUERY_KEY,
    queryFn: fetchFeaturedNames,
    retry: false,
  });

export default useFeaturedNames;
