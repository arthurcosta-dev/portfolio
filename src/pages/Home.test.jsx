import { screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routes } from "../routes";
import { renderRoutes } from "../test/renderWithProviders";

describe("Home", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.title = "";
  });

  it("mostra o nome do dono do site e devolve o título da aba", async () => {
    document.title = "Projetos | Arthur Costa";
    renderRoutes(routes);

    expect(
      await screen.findByRole("heading", { level: 1, name: /Arthur\s*Costa/ }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe("Arthur Costa"));
  });

  it("a ilustração do Sobre é WebP, com tamanho reservado e carregamento tardio", async () => {
    renderRoutes(routes);

    const image = await screen.findByRole("img", {
      name: /céu noturno com uma órbita/,
    });

    expect(image.getAttribute("src")).toMatch(/\.webp$/);
    expect(image.getAttribute("srcset")).toMatch(/600w.*1200w/);
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "400");
  });

  it("nenhum link aponta para um valor TODO", async () => {
    renderRoutes(routes);

    await screen.findByRole("heading", { level: 1 });

    screen.getAllByRole("link").forEach((link) => {
      expect(link.getAttribute("href")).not.toMatch(/TODO/);
    });
  });

  it("o menu leva às seções a partir de qualquer página", async () => {
    renderRoutes(routes, "/projetos");

    const menu = await screen.findByRole("navigation", { name: "Principal" });

    expect(within(menu).getByRole("link", { name: "Sobre" })).toHaveAttribute(
      "href",
      "/#sobre",
    );
    expect(within(menu).getByRole("link", { name: "Contato" })).toHaveAttribute(
      "href",
      "/#contato",
    );
  });
});
