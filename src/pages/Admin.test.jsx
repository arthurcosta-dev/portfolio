import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routes } from "../routes";
import {
  isInvalidCredentials,
  onAuthChange,
  signIn,
  signOut,
} from "../services/auth";
import { fetchFeaturedNames, saveFeaturedNames } from "../services/featured";
import { fetchMessages, setMessageAnswered } from "../services/messages";
import { buildRepo, renderRoutes } from "../test/renderWithProviders";

vi.mock("../services/auth");
vi.mock("../services/messages");

const MESSAGE = {
  id: "1",
  name: "Ana Souza",
  email: "ana@dominio.com",
  message: "Gostaria de conversar sobre uma vaga.",
  answered: false,
  created_at: "2026-11-01T12:00:00Z",
};

// Dispara a sessão como o Supabase faz ao assinar.
const startSession = (session) => {
  let notify;
  onAuthChange.mockImplementation(async (callback) => {
    notify = callback;
    callback(session);
    return () => {};
  });
  return (next) => notify(next);
};

const stubRepos = (repos) =>
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(repos),
    }),
  );

describe("login e painel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMessages.mockResolvedValue([MESSAGE]);
    fetchFeaturedNames.mockResolvedValue([]);
    saveFeaturedNames.mockResolvedValue();
    setMessageAnswered.mockResolvedValue();
    signIn.mockResolvedValue();
    signOut.mockResolvedValue();
    isInvalidCredentials.mockReturnValue(false);
    stubRepos([buildRepo({ name: "alfa" }), buildRepo({ name: "beta" })]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sem sessão, /admin redireciona para o login e não busca mensagens", async () => {
    startSession(null);
    const router = renderRoutes(routes, "/admin");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Entrar" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/login");
    expect(fetchMessages).not.toHaveBeenCalled();
  });

  it("enquanto confere a sessão, não mostra o painel nem redireciona", async () => {
    onAuthChange.mockReturnValue(new Promise(() => {}));
    const router = renderRoutes(routes, "/admin");

    expect(
      await screen.findByRole("status", { name: "Conferindo o login" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/admin");
    expect(screen.queryByRole("heading", { name: "Painel" })).toBeNull();
  });

  it("com sessão, /admin mostra as mensagens", async () => {
    startSession({ user: { id: "dono" } });
    renderRoutes(routes, "/admin");

    expect(await screen.findByText("Ana Souza")).toBeInTheDocument();
    expect(screen.getByText(MESSAGE.message)).toBeInTheDocument();
  });

  it("com sessão, /login vai direto para o painel", async () => {
    startSession({ user: { id: "dono" } });
    const router = renderRoutes(routes, "/login");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Painel" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/admin");
  });

  it("login valida os campos antes de chamar o serviço", async () => {
    startSession(null);
    const user = userEvent.setup();
    renderRoutes(routes, "/login");

    await user.click(await screen.findByRole("button", { name: "Entrar" }));

    expect(screen.getByText("Digite seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Digite sua senha.")).toBeInTheDocument();
    expect(signIn).not.toHaveBeenCalled();
  });

  it("login com senha errada mostra a mensagem certa", async () => {
    startSession(null);
    signIn.mockRejectedValue(new Error("invalid"));
    isInvalidCredentials.mockReturnValue(true);
    const user = userEvent.setup();
    renderRoutes(routes, "/login");

    await user.type(await screen.findByLabelText("E-mail"), "a@b.co");
    await user.type(screen.getByLabelText("Senha"), "errada");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByText("E-mail ou senha incorretos."),
    ).toBeInTheDocument();
  });

  it("login certo leva ao painel", async () => {
    const notify = startSession(null);
    signIn.mockImplementation(async () => notify({ user: { id: "dono" } }));
    const user = userEvent.setup();
    const router = renderRoutes(routes, "/login");

    await user.type(await screen.findByLabelText("E-mail"), "a@b.co");
    await user.type(screen.getByLabelText("Senha"), "certa");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await screen.findByRole("heading", { level: 1, name: "Painel" });
    expect(router.state.location.pathname).toBe("/admin");
  });

  it("sair volta para o login", async () => {
    const notify = startSession({ user: { id: "dono" } });
    signOut.mockImplementation(async () => notify(null));
    const user = userEvent.setup();
    const router = renderRoutes(routes, "/admin");

    await user.click(await screen.findByRole("button", { name: "Sair" }));

    await screen.findByRole("heading", { level: 1, name: "Entrar" });
    expect(router.state.location.pathname).toBe("/login");
  });

  it("marca a mensagem como respondida", async () => {
    startSession({ user: { id: "dono" } });
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    await user.click(
      await screen.findByRole("button", { name: "Marcar como respondida" }),
    );

    await waitFor(() =>
      expect(setMessageAnswered.mock.calls[0][0]).toEqual({
        id: "1",
        answered: true,
      }),
    );
    expect(fetchMessages.mock.calls.length).toBeGreaterThan(1);
  });

  it("mensagem respondida mostra a marca e deixa desmarcar", async () => {
    startSession({ user: { id: "dono" } });
    fetchMessages.mockResolvedValue([{ ...MESSAGE, answered: true }]);
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    expect(await screen.findByText("Respondida")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Desmarcar" }));

    await waitFor(() =>
      expect(setMessageAnswered.mock.calls[0][0]).toEqual({
        id: "1",
        answered: false,
      }),
    );
  });

  it("mostra erro e lista vazia nas mensagens", async () => {
    startSession({ user: { id: "dono" } });
    fetchMessages.mockRejectedValueOnce(new Error("falhou"));
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("As mensagens não carregaram");

    fetchMessages.mockResolvedValue([]);
    await user.click(
      within(alert).getByRole("button", { name: "Tentar de novo" }),
    );

    expect(
      await screen.findByText("Nenhuma mensagem recebida ainda."),
    ).toBeInTheDocument();
  });

  it("escolhe destaques, ordena e salva", async () => {
    startSession({ user: { id: "dono" } });
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    const save = await screen.findByRole("button", {
      name: "Salvar destaques",
    });
    expect(save).toBeDisabled();

    await user.click(screen.getByRole("switch", { name: "Destacar alfa" }));
    await user.click(screen.getByRole("switch", { name: "Destacar beta" }));
    await user.click(screen.getByRole("button", { name: "Subir beta" }));
    await user.click(save);

    await waitFor(() =>
      expect(saveFeaturedNames.mock.calls[0][0]).toEqual(["beta", "alfa"]),
    );
    expect(await screen.findByText("Destaques salvos.")).toBeInTheDocument();
  });

  it("avisa quando os destaques não salvam", async () => {
    startSession({ user: { id: "dono" } });
    saveFeaturedNames.mockRejectedValue(new Error("falhou"));
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    await user.click(
      await screen.findByRole("switch", { name: "Destacar alfa" }),
    );
    await user.click(screen.getByRole("button", { name: "Salvar destaques" }));

    expect(
      await screen.findByText(/Os destaques não foram salvos/),
    ).toBeInTheDocument();
  });

  it("a home segue os destaques escolhidos, na ordem", async () => {
    startSession(null);
    fetchFeaturedNames.mockResolvedValue(["beta", "sumiu", "alfa"]);
    renderRoutes(routes, "/");

    await screen.findByRole("heading", { name: "beta" });

    expect(
      screen
        .getAllByRole("article")
        .map((card) => within(card).getByRole("heading").textContent),
    ).toEqual(["beta", "alfa"]);
  });

  it("se o Supabase falhar, a home usa os mais recentes", async () => {
    startSession(null);
    fetchFeaturedNames.mockRejectedValue(new Error("fora do ar"));
    renderRoutes(routes, "/");

    expect(
      await screen.findByRole("heading", { name: "alfa" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
