import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchFeaturedNames, saveFeaturedNames } from "./featured";
import { getSupabase } from "./supabase";

vi.unmock("./featured");
vi.mock("./supabase");

describe("fetchFeaturedNames", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("devolve os nomes na ordem, sem carregar o Supabase", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ repo_name: "b" }, { repo_name: "a" }]),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchFeaturedNames()).resolves.toEqual(["b", "a"]);
    expect(fetchMock.mock.calls[0][0]).toContain("order=position");
    expect(getSupabase).not.toHaveBeenCalled();
  });

  it("dá erro quando o banco recusa", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503 }),
    );

    await expect(fetchFeaturedNames()).rejects.toThrow("503");
  });
});

describe("saveFeaturedNames", () => {
  let upsert;
  let not;
  let neq;

  beforeEach(() => {
    upsert = vi.fn().mockResolvedValue({ error: null });
    not = vi.fn().mockResolvedValue({ error: null });
    neq = vi.fn().mockResolvedValue({ error: null });
    getSupabase.mockResolvedValue({
      from: () => ({ upsert, delete: () => ({ not, neq }) }),
    });
  });

  it("grava a ordem e apaga os que saíram", async () => {
    await saveFeaturedNames(["b", "a"]);

    expect(upsert).toHaveBeenCalledWith([
      { repo_name: "b", position: 0 },
      { repo_name: "a", position: 1 },
    ]);
    expect(not).toHaveBeenCalledWith("repo_name", "in", '("b","a")');
  });

  it("lista vazia só apaga tudo", async () => {
    await saveFeaturedNames([]);

    expect(upsert).not.toHaveBeenCalled();
    expect(neq).toHaveBeenCalledWith("repo_name", "");
  });

  it("se gravar falhar, não apaga nada", async () => {
    const failure = new Error("falhou");
    upsert.mockResolvedValue({ error: failure });

    await expect(saveFeaturedNames(["a"])).rejects.toBe(failure);
    expect(not).not.toHaveBeenCalled();
  });
});
