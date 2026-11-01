import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "../components/ui/ThemeToggle";
import ThemeProvider from "./ThemeProvider";

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.add("dark");
  });

  it("troca para o tema claro e guarda a escolha", async () => {
    renderToggle();

    await userEvent.click(
      screen.getByRole("button", { name: "Mudar para o tema claro" }),
    );

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("volta para o escuro e guarda a escolha", async () => {
    document.documentElement.classList.remove("dark");
    renderToggle();

    await userEvent.click(
      screen.getByRole("button", { name: "Mudar para o tema escuro" }),
    );

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
