import { QueryClient } from "@tanstack/react-query";

const TEN_MINUTES = 10 * 60 * 1000;

export const QUERY_DEFAULTS = {
  staleTime: TEN_MINUTES,
  refetchOnWindowFocus: false,
  // Sem conexão, tenta e mostra o erro, em vez de ficar parado carregando.
  networkMode: "always",
  // Repetir não adianta quando o limite do GitHub estourou.
  retry: (failureCount, error) => !error.isRateLimit && failureCount < 1,
};

export const MUTATION_DEFAULTS = { networkMode: "always" };

export const queryClient = new QueryClient({
  defaultOptions: { queries: QUERY_DEFAULTS, mutations: MUTATION_DEFAULTS },
});
