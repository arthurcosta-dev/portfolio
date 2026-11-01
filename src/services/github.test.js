import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRepos } from "./github";

const stubFetch = (status, body = []) =>
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: status < 400,
      status,
      json: () => Promise.resolve(body),
    }),
  );

describe("fetchRepos", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("devolve só os repositórios do portfólio", async () => {
    stubFetch(200, [
      { name: "rewind-tvtime", fork: false, archived: false },
      { name: "um-fork", fork: true, archived: false },
    ]);

    const repos = await fetchRepos();

    expect(repos.map((repo) => repo.name)).toEqual(["rewind-tvtime"]);
  });

  it.each([403, 429])(
    "marca o status %i como limite de requisições",
    async (status) => {
      stubFetch(status);

      await expect(fetchRepos()).rejects.toMatchObject({ isRateLimit: true });
    },
  );

  it("não confunde erro do servidor com limite de requisições", async () => {
    stubFetch(500);

    await expect(fetchRepos()).rejects.toMatchObject({ isRateLimit: false });
  });
});
