import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendMessageEmail } from "./email";
import { sendContactMessage } from "./messages";
import { getSupabase } from "./supabase";

vi.mock("./supabase");
vi.mock("./email");

const CONTACT = {
  name: " Ana Souza ",
  email: " ana@dominio.com ",
  message: " Gostaria de conversar sobre uma vaga. ",
};
const TRIMMED = {
  name: "Ana Souza",
  email: "ana@dominio.com",
  message: "Gostaria de conversar sobre uma vaga.",
};

describe("sendContactMessage", () => {
  let insert;

  beforeEach(() => {
    insert = vi.fn().mockResolvedValue({ error: null });
    getSupabase.mockResolvedValue({ from: () => ({ insert }) });
    sendMessageEmail.mockResolvedValue();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("salva e avisa por e-mail, sem espaços nas pontas", async () => {
    await sendContactMessage(CONTACT);

    expect(insert).toHaveBeenCalledWith(TRIMMED);
    expect(sendMessageEmail).toHaveBeenCalledWith(TRIMMED);
  });

  it("se não salvar, dá erro e não manda e-mail", async () => {
    const failure = new Error("falhou");
    insert.mockResolvedValue({ error: failure });
    sendMessageEmail.mockClear();

    await expect(sendContactMessage(CONTACT)).rejects.toBe(failure);
    expect(sendMessageEmail).not.toHaveBeenCalled();
  });

  it("se só o e-mail falhar, considera enviado e registra o aviso", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    sendMessageEmail.mockRejectedValue(new Error("cota"));

    await expect(sendContactMessage(CONTACT)).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledOnce();
  });
});
