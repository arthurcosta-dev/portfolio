import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formata no padrão brasileiro, no horário de Brasília", () => {
    expect(formatDate("2026-11-01T02:00:00Z")).toBe("31/10/2026");
  });
});
