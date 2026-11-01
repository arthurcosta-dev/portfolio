import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routes } from "../routes";
import { buildRepo, renderRoutes } from "../test/renderWithProviders";

const stubRepos = (repos) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve(repos),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

const stubFailure = (status) =>
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: false, status, json: async () => ({}) }),
  );

describe("páginas de projetos", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mostra o skeleton enquanto carrega e depois os dados do repositório", async () => {
    stubRepos([buildRepo()]);
    renderRoutes(routes, "/projetos");

    expect(screen.getByRole("status")).toBeInTheDocument();

    expect(await screen.findByText("rewind-tvtime")).toBeInTheDocument();
    expect(screen.getByText("Guia pessoal de séries.")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("20/10/2026")).toBeInTheDocument();
  });

  it("mostra o texto padrão para repositório sem descrição", async () => {
    stubRepos([buildRepo({ description: null })]);
    renderRoutes(routes, "/projetos");

    expect(await screen.findByText("Sem descrição ainda.")).toBeInTheDocument();
  });

  it("mostra o estado de lista vazia", async () => {
    stubRepos([]);
    renderRoutes(routes, "/projetos");

    expect(
      await screen.findByText("Nenhum projeto público encontrado ainda."),
    ).toBeInTheDocument();
  });

  it("explica o limite do GitHub e tenta de novo", async () => {
    stubFailure(403);
    renderRoutes(routes, "/projetos");

    expect(
      await screen.findByText("O GitHub pediu uma pausa"),
    ).toBeInTheDocument();

    stubRepos([buildRepo()]);
    await userEvent.click(
      screen.getByRole("button", { name: "Tentar de novo" }),
    );

    expect(await screen.findByText("rewind-tvtime")).toBeInTheDocument();
  });

  it("não repete a requisição ao navegar entre as páginas", async () => {
    const fetchMock = stubRepos([buildRepo()]);
    const router = renderRoutes(routes, "/");

    await screen.findByRole("heading", { name: "rewind-tvtime" });
    await router.navigate("/projetos");
    await screen.findByRole("heading", { level: 1, name: "Projetos" });
    await router.navigate("/projetos/rewind-tvtime");
    await screen.findByRole("heading", { level: 1, name: "rewind-tvtime" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("abre direto pelo link do projeto, com os links do repositório", async () => {
    stubRepos([buildRepo()]);
    renderRoutes(routes, "/projetos/rewind-tvtime");

    expect(
      await screen.findByRole("heading", { level: 1, name: "rewind-tvtime" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Abrir site" })).toHaveAttribute(
      "href",
      "https://rewind-tvtime.vercel.app",
    );
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
  });

  it("avisa quando o projeto do link não existe", async () => {
    stubRepos([buildRepo()]);
    renderRoutes(routes, "/projetos/nao-existe");

    expect(
      await screen.findByText("Projeto não encontrado."),
    ).toBeInTheDocument();
  });

  it.each([
    [1, 1, 0],
    [2, 1, 1],
    [3, 1, 2],
    [5, 1, 2],
  ])(
    "na home, %i repositórios viram %i grande e %i pequenos",
    async (total, large, small) => {
      const repos = Array.from({ length: total }, (_, index) =>
        buildRepo({ name: `repo-${index}` }),
      );
      stubRepos(repos);
      renderRoutes(routes, "/");

      await screen.findByRole("heading", { name: "repo-0" });

      expect(screen.getAllByRole("article")).toHaveLength(large + small);
    },
  );
});
