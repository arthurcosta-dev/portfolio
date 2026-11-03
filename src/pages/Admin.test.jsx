import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routes } from "../routes";
import {
  isInvalidCredentials,
  isTooManyAttempts,
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
    isTooManyAttempts.mockReturnValue(false);
    stubRepos([buildRepo({ name: "alfa" }), buildRepo({ name: "beta" })]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sem sessão, /admin redireciona para o login e não busca mensagens", async () => {
    startSession(null);
    const { router } = renderRoutes(routes, "/admin");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Entrar" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/login");
    expect(fetchMessages).not.toHaveBeenCalled();
  });

  it("enquanto confere a sessão, não mostra o painel nem redireciona", async () => {
    onAuthChange.mockReturnValue(new Promise(() => {}));
    const { router } = renderRoutes(routes, "/admin");

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
    const { router } = renderRoutes(routes, "/login");

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

  it("muitas tentativas de login têm mensagem própria e o erro some ao digitar", async () => {
    startSession(null);
    signIn.mockRejectedValue(new Error("limite"));
    isTooManyAttempts.mockReturnValue(true);
    const user = userEvent.setup();
    renderRoutes(routes, "/login");

    await user.type(await screen.findByLabelText("E-mail"), "a@b.co");
    await user.type(screen.getByLabelText("Senha"), "errada");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    const message = await screen.findByText(/Muitas tentativas/);
    expect(message).toBeInTheDocument();

    await user.type(screen.getByLabelText("Senha"), "x");
    expect(screen.queryByText(/Muitas tentativas/)).toBeNull();
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
    const { router } = renderRoutes(routes, "/login");

    await user.type(await screen.findByLabelText("E-mail"), "a@b.co");
    await user.type(screen.getByLabelText("Senha"), "certa");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await screen.findByRole("heading", { level: 1, name: "Painel" });
    expect(router.state.location.pathname).toBe("/admin");
  });

  it("sair volta para o login e tira as mensagens da memória", async () => {
    const notify = startSession({ user: { id: "dono" } });
    signOut.mockImplementation(async () => notify(null));
    const user = userEvent.setup();
    const { router, queryClient } = renderRoutes(routes, "/admin");

    await screen.findByText("Ana Souza");
    expect(queryClient.getQueryData(["messages"])).toEqual([MESSAGE]);

    await user.click(screen.getByRole("button", { name: "Sair" }));

    await screen.findByRole("heading", { level: 1, name: "Entrar" });
    expect(router.state.location.pathname).toBe("/login");
    expect(queryClient.getQueryData(["messages"])).toBeUndefined();
  });

  it("sessão encerrada em outra aba também tira as mensagens da memória", async () => {
    const notify = startSession({ user: { id: "dono" } });
    const { queryClient } = renderRoutes(routes, "/admin");

    await screen.findByText("Ana Souza");
    act(() => notify(null));

    await screen.findByRole("heading", { level: 1, name: "Entrar" });
    expect(queryClient.getQueryData(["messages"])).toBeUndefined();
  });

  it("se a conferência da sessão falhar, mostra o login e volta a tentar", async () => {
    const notify = vi.fn();
    onAuthChange.mockRejectedValueOnce(new Error("rede"));
    onAuthChange.mockRejectedValueOnce(new Error("rede"));
    onAuthChange.mockImplementation(async (callback) => {
      notify.mockImplementation(callback);
      return () => {};
    });
    const { router } = renderRoutes(routes, "/login");

    await screen.findByRole("heading", { level: 1, name: "Entrar" });

    await waitFor(() => expect(notify.getMockImplementation()).toBeDefined(), {
      timeout: 4000,
    });
    act(() => notify({ user: { id: "dono" } }));

    await screen.findByRole("heading", { level: 1, name: "Painel" });
    expect(router.state.location.pathname).toBe("/admin");
  }, 8000);

  it("não vira link o e-mail com parâmetros escondidos", async () => {
    startSession({ user: { id: "dono" } });
    const unsafe = "a@b.co?bcc=x";
    fetchMessages.mockResolvedValue([{ ...MESSAGE, email: unsafe }]);
    renderRoutes(routes, "/admin");

    expect(await screen.findByText(unsafe)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: unsafe })).toBeNull();
  });

  it("e-mail normal abre o programa de e-mail", async () => {
    startSession({ user: { id: "dono" } });
    renderRoutes(routes, "/admin");

    expect(
      await screen.findByRole("link", { name: MESSAGE.email }),
    ).toHaveAttribute("href", `mailto:${MESSAGE.email}`);
  });

  it("limite do GitHub nos destaques explica a causa", async () => {
    startSession({ user: { id: "dono" } });
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }),
    );
    renderRoutes(routes, "/admin");

    expect(
      await screen.findByText("O GitHub pediu uma pausa"),
    ).toBeInTheDocument();
  });

  it("falha só do banco nos destaques refaz só o banco", async () => {
    startSession({ user: { id: "dono" } });
    fetchFeaturedNames.mockRejectedValueOnce(new Error("falhou"));
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    const alert = (
      await screen.findByText("Os destaques não carregaram")
    ).closest('[role="alert"]');
    const gitHubCalls = fetch.mock.calls.length;

    await user.click(
      within(alert).getByRole("button", { name: "Tentar de novo" }),
    );

    await screen.findByRole("switch", { name: "Destacar alfa" });
    expect(fetch.mock.calls.length).toBe(gitHubCalls);
  });

  it("se salvar e reler falharem, a lista continua e o aviso aparece", async () => {
    startSession({ user: { id: "dono" } });
    saveFeaturedNames.mockRejectedValue(new Error("sem rede"));
    const user = userEvent.setup();
    renderRoutes(routes, "/admin");

    await user.click(
      await screen.findByRole("switch", { name: "Destacar alfa" }),
    );
    fetchFeaturedNames.mockRejectedValue(new Error("sem rede"));
    await user.click(screen.getByRole("button", { name: "Salvar destaques" }));

    expect(
      await screen.findByText(/Os destaques não foram salvos/),
    ).toBeInTheDocument();
    await waitFor(() => expect(fetchFeaturedNames.mock.calls.length).toBe(2));
    expect(screen.getByRole("switch", { name: "Destacar alfa" })).toBeChecked();
    expect(screen.queryByText("Os destaques não carregaram")).toBeNull();
  });

  it("sair da tela durante a falha não deixa novas tentativas rodando", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    let fail;
    onAuthChange.mockImplementation(
      () =>
        new Promise((_, reject) => {
          fail = reject;
        }),
    );
    const { router } = renderRoutes(routes, "/login");
    await screen.findByRole("status", { name: "Conferindo o login" });
    const callsBefore = onAuthChange.mock.calls.length;

    await act(() => router.navigate("/projetos"));
    await act(async () => {
      fail(new Error("rede"));
      await vi.advanceTimersByTimeAsync(10000);
    });

    expect(onAuthChange.mock.calls.length).toBe(callsBefore);
    vi.useRealTimers();
  });

  it("destaques sem projetos mostram o estado vazio", async () => {
    startSession({ user: { id: "dono" } });
    stubRepos([]);
    renderRoutes(routes, "/admin");

    expect(
      await screen.findByText("Nenhum projeto público encontrado ainda."),
    ).toBeInTheDocument();
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

  it("mostra o carregamento das mensagens e dos destaques", async () => {
    startSession({ user: { id: "dono" } });
    fetchMessages.mockReturnValue(new Promise(() => {}));
    fetchFeaturedNames.mockReturnValue(new Promise(() => {}));
    renderRoutes(routes, "/admin");

    expect(
      await screen.findByRole("status", { name: "Carregando mensagens" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Carregando projetos" }),
    ).toBeInTheDocument();
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
