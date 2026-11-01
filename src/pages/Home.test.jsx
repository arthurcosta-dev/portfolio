import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/renderWithProviders";
import Home from "./Home";

describe("Home", () => {
  it("mostra o nome do dono do site", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Arthur\s*Costa/ }),
    ).toBeInTheDocument();
  });

  it("não mostra link enquanto o contato ainda é TODO", () => {
    renderWithProviders(<Home />);

    expect(screen.queryByText("TODO")).not.toBeInTheDocument();
  });
});
