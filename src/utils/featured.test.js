import { describe, expect, it } from "vitest";
import { moveItem, orderBySelection } from "./featured";

describe("moveItem", () => {
  it.each([
    ["b", -1, ["b", "a", "c"]],
    ["b", 1, ["a", "c", "b"]],
    ["a", -1, ["a", "b", "c"]],
    ["c", 1, ["a", "b", "c"]],
    ["x", 1, ["a", "b", "c"]],
  ])("move %s em %i", (item, offset, expected) => {
    expect(moveItem(["a", "b", "c"], item, offset)).toEqual(expected);
  });
});

describe("orderBySelection", () => {
  it("põe os escolhidos primeiro, na ordem escolhida", () => {
    const repos = [{ name: "a" }, { name: "b" }, { name: "c" }];

    expect(
      orderBySelection(repos, ["c", "a"]).map((repo) => repo.name),
    ).toEqual(["c", "a", "b"]);
  });

  it("ignora escolhido que não existe mais", () => {
    expect(orderBySelection([{ name: "a" }], ["sumiu", "a"])).toEqual([
      { name: "a" },
    ]);
  });
});
