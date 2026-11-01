import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("mostra o nome do dono do site", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Arthur Costa" }),
    ).toBeInTheDocument();
  });
});
