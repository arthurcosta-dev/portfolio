import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// A home lê os destaques do Supabase; por padrão, nenhum escolhido e nada de rede.
vi.mock("../services/featured", () => ({
  fetchFeaturedNames: vi.fn().mockResolvedValue([]),
  saveFeaturedNames: vi.fn().mockResolvedValue(),
}));

// O jsdom não implementa rolagem, que o ScrollRestoration usa.
window.scrollTo = vi.fn();

afterEach(cleanup);
