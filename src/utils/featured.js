// Troca o item de lugar; nas pontas da lista, devolve a lista como está.
export const moveItem = (items, item, offset) => {
  const from = items.indexOf(item);
  const to = from + offset;

  if (from < 0 || to < 0 || to >= items.length) {
    return items;
  }

  const next = [...items];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
};

// Os escolhidos vêm primeiro, na ordem escolhida; os outros seguem como estão.
export const orderBySelection = (repos, selected) => [
  ...selected
    .map((name) => repos.find((repo) => repo.name === name))
    .filter(Boolean),
  ...repos.filter((repo) => !selected.includes(repo.name)),
];
