import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { QUERY_DEFAULTS } from "../config/queryClient";
import ThemeProvider from "../context/ThemeProvider";

export const renderRoutes = (routes, initialEntry = "/") => {
  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });
  // Mesmo cache do site; só sem repetição, para o teste de erro não esperar.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { ...QUERY_DEFAULTS, retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );

  return router;
};

export const renderWithProviders = (element) =>
  renderRoutes([{ path: "/", element }]);

// Repositório como a API do GitHub devolve, só com os campos que o site usa.
export const buildRepo = (overrides = {}) => ({
  id: overrides.name ?? "rewind-tvtime",
  name: "rewind-tvtime",
  description: "Guia pessoal de séries.",
  language: "JavaScript",
  topics: ["react"],
  stargazers_count: 2,
  forks_count: 1,
  updated_at: "2026-10-20T12:00:00Z",
  homepage: "https://rewind-tvtime.vercel.app",
  html_url: "https://github.com/arthurcosta-dev/rewind-tvtime",
  fork: false,
  archived: false,
  ...overrides,
});
