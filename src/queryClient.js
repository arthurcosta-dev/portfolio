import { QueryClient } from "@tanstack/react-query";

const TEN_MINUTES = 10 * 60 * 1000;

export const QUERY_DEFAULTS = {
  staleTime: TEN_MINUTES,
  refetchOnWindowFocus: false,
  // Repetir não adianta quando o limite do GitHub estourou.
  retry: (failureCount, error) => !error.isRateLimit && failureCount < 1,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: QUERY_DEFAULTS },
});
