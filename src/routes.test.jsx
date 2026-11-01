import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { routes } from "./routes";
import { renderRoutes } from "./test/renderWithProviders";

describe("rotas", () => {
  it("mostra a página 404 em rota inexistente", async () => {
    renderRoutes(routes, "/rota-que-nao-existe");

    expect(
      await screen.findByRole("heading", { level: 1, name: "404" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para o início" }),
    ).toHaveAttribute("href", "/");
  });

  it("mostra a página de erro quando uma rota falha ao desenhar", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const Broken = () => {
      throw new Error("falha de teste");
    };
    const [root] = routes;
    const [pages] = root.children;

    renderRoutes(
      [
        {
          ...root,
          children: [
            { ...pages, children: [{ index: true, element: <Broken /> }] },
          ],
        },
      ],
      "/",
    );

    expect(
      await screen.findByRole("heading", { name: "Algo deu errado" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeVisible();
    vi.restoreAllMocks();
  });
});
