import { describe, expect, it } from "vitest";
import {
  validateContact,
  validateEmail,
  validateMessage,
  validateName,
  validatePassword,
} from "./validators";

const VALID = {
  name: "Ana Souza",
  email: "ana@dominio.com",
  message: "Gostaria de conversar sobre uma vaga de estágio.",
};

describe("validators", () => {
  it.each([
    ["", "Digite seu nome."],
    ["   ", "Digite seu nome."],
    ["A", "O nome precisa de pelo menos 2 letras."],
    ["a".repeat(101), "Use até 100 caracteres no nome."],
    ["Ana", ""],
  ])("nome %j", (value, expected) => {
    expect(validateName(value)).toBe(expected);
  });

  it.each([
    ["", "Digite seu e-mail."],
    ["ana@", "Digite um e-mail válido, como nome@dominio.com."],
    ["ana@dominio", "Digite um e-mail válido, como nome@dominio.com."],
    [
      "ana souza@dominio.com",
      "Digite um e-mail válido, como nome@dominio.com.",
    ],
    [
      `${"a".repeat(250)}@b.co`,
      "Digite um e-mail válido, como nome@dominio.com.",
    ],
    ["ana@b.co?bcc=x", "Digite um e-mail válido, como nome@dominio.com."],
    [" ana@dominio.com ", ""],
  ])("e-mail %j", (value, expected) => {
    expect(validateEmail(value)).toBe(expected);
  });

  it.each([
    ["", "Escreva sua mensagem."],
    ["curta demais", "Escreva pelo menos 20 caracteres."],
    [`${" ".repeat(30)}curta`, "Escreva pelo menos 20 caracteres."],
    ["a".repeat(2001), "Use até 2000 caracteres na mensagem."],
    ["a".repeat(20), ""],
    ["😀".repeat(10), "Escreva pelo menos 20 caracteres."],
    ["😀".repeat(20), ""],
  ])("mensagem %j", (value, expected) => {
    expect(validateMessage(value)).toBe(expected);
  });

  it("senha é obrigatória", () => {
    expect(validatePassword("")).toBe("Digite sua senha.");
    expect(validatePassword(" a ")).toBe("");
  });

  it("formulário válido não tem erros", () => {
    expect(validateContact(VALID)).toEqual({});
  });

  it("devolve só os campos com erro", () => {
    expect(validateContact({ ...VALID, email: "ana@" })).toEqual({
      email: "Digite um e-mail válido, como nome@dominio.com.",
    });
  });
});
