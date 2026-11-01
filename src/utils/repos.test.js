import { describe, expect, it } from "vitest";
import { filterPortfolioRepos, findRepoByName, getSafeHomepage } from "./repos";

describe("filterPortfolioRepos", () => {
  it("tira forks, arquivados e o repositório de perfil", () => {
    const repos = [
      { name: "rewind-tvtime", fork: false, archived: false },
      { name: "um-fork", fork: true, archived: false },
      { name: "antigo", fork: false, archived: true },
      { name: "arthurcosta-dev", fork: false, archived: false },
    ];

    expect(
      filterPortfolioRepos(repos, "arthurcosta-dev").map((repo) => repo.name),
    ).toEqual(["rewind-tvtime"]);
  });
});

describe("findRepoByName", () => {
  it("encontra sem diferenciar maiúsculas", () => {
    expect(findRepoByName([{ name: "Rewind" }], "rewind")).toEqual({
      name: "Rewind",
    });
  });

  it("devolve undefined quando não existe", () => {
    expect(findRepoByName([{ name: "Rewind" }], "outro")).toBeUndefined();
  });
});

describe("getSafeHomepage", () => {
  it("aceita http e https", () => {
    expect(getSafeHomepage({ homepage: "https://site.app" })).toBe(
      "https://site.app",
    );
  });

  it.each([null, "", "javascript:alert(1)", "site.app"])(
    "recusa %s",
    (homepage) => {
      expect(getSafeHomepage({ homepage })).toBeNull();
    },
  );
});
