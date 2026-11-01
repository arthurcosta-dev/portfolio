import { onlineManager } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SITE } from "../../config/site";
import { sendContactMessage } from "../../services/messages";
import { renderWithProviders } from "../../test/renderWithProviders";
import ContactForm from "./ContactForm";

vi.mock("../../services/messages");

const fillValid = async (user) => {
  await user.type(screen.getByLabelText("Nome"), "Ana Souza");
  await user.type(screen.getByLabelText("E-mail"), "ana@dominio.com");
  await user.type(
    screen.getByLabelText("Mensagem"),
    "Gostaria de conversar sobre uma vaga.",
  );
};

const submitButton = () => screen.getByRole("button", { name: /Envia/ });

describe("ContactForm", () => {
  beforeEach(() => {
    sendContactMessage.mockReset();
    sendContactMessage.mockResolvedValue();
  });

  afterEach(() => {
    onlineManager.setOnline(true);
  });

  it("mostra o erro do campo ao sair dele e tira ao corrigir", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    const email = await screen.findByLabelText("E-mail");
    await user.type(email, "ana@");
    await user.tab();

    const message = "Digite um e-mail válido, como nome@dominio.com.";
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription(message);
    expect(email).toHaveClass("h-13", "border-erro");

    await user.type(email, "dominio.com");

    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "false");
  });

  it("não envia com erro: mostra cada mensagem e foca o primeiro campo", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(await screen.findByRole("button", { name: /Envia/ }));

    expect(screen.getByText("Digite seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Digite seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Escreva sua mensagem.")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveFocus();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("bloqueia o botão enquanto envia e não envia duas vezes", async () => {
    let finish;
    sendContactMessage.mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await screen.findByLabelText("Nome");
    await fillValid(user);
    await user.dblClick(submitButton());

    expect(submitButton()).toBeDisabled();
    expect(submitButton()).toHaveTextContent("Enviando…");
    expect(screen.getByLabelText("Nome")).toBeDisabled();
    expect(screen.getByLabelText("E-mail")).toBeDisabled();
    expect(screen.getByLabelText("Mensagem")).toBeDisabled();
    expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "true");
    expect(sendContactMessage).toHaveBeenCalledOnce();

    finish();

    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("confirma o envio e limpa os campos", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await screen.findByLabelText("Nome");
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText(SITE.contact.sent)).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("Mensagem")).toHaveValue("");
  });

  it("avisa da falha, mantém o texto e deixa tentar de novo", async () => {
    sendContactMessage.mockRejectedValueOnce(new Error("falhou"));
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await screen.findByLabelText("Nome");
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText(SITE.contact.failed)).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveValue("Ana Souza");

    await user.click(submitButton());

    expect(await screen.findByText(SITE.contact.sent)).toBeInTheDocument();
    expect(sendContactMessage).toHaveBeenCalledTimes(2);
  });

  it("sem conexão, mostra o erro em vez de ficar enviando", async () => {
    sendContactMessage.mockRejectedValue(new TypeError("Failed to fetch"));
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await screen.findByLabelText("Nome");
    await fillValid(user);
    onlineManager.setOnline(false);
    await user.click(submitButton());

    expect(await screen.findByText(SITE.contact.failed)).toBeInTheDocument();
    expect(submitButton()).toBeEnabled();
  });

  it("anuncia o erro do campo em região que já existia", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    const name = await screen.findByLabelText("Nome");
    const region = name.nextElementSibling;
    expect(region).toHaveAttribute("aria-live", "polite");

    await user.click(name);
    await user.tab();

    expect(name.nextElementSibling).toBe(region);
    expect(region).toHaveTextContent("Digite seu nome.");
  });

  it("com o campo isca preenchido, finge que enviou e não grava", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await screen.findByLabelText("Nome");
    await fillValid(user);
    await user.type(document.querySelector('[name="website"]'), "spam");
    await user.click(submitButton());

    expect(await screen.findByText(SITE.contact.sent)).toBeInTheDocument();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
});
