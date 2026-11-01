import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../test/renderWithProviders";
import Home from "./Home";

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
  });

  it("mostra o nome do dono do site", async () => {
    renderWithProviders(<Home />);

    expect(
      await screen.findByRole("heading", { level: 1, name: /Arthur\s*Costa/ }),
    ).toBeInTheDocument();
  });

  it("não mostra link enquanto o contato ainda é TODO", async () => {
    renderWithProviders(<Home />);

    await screen.findByRole("heading", { level: 1 });

    expect(screen.queryByText("TODO")).not.toBeInTheDocument();
  });
});
