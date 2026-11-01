import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import ThemeProvider from "../context/ThemeProvider";

export const renderRoutes = (routes, initialEntry = "/") =>
  render(
    <ThemeProvider>
      <RouterProvider
        router={createMemoryRouter(routes, { initialEntries: [initialEntry] })}
      />
    </ThemeProvider>,
  );

export const renderWithProviders = (element) =>
  renderRoutes([{ path: "/", element }]);
