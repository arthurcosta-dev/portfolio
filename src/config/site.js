// Dados pessoais ficam só aqui. TODO = valor que o Arthur ainda vai informar.
export const SITE = {
  name: "Arthur Costa",
  githubUser: import.meta.env.VITE_GITHUB_USER ?? "arthurcosta-dev",
  email: "TODO",
  linkedinUrl: "TODO",
};

export const GITHUB_URL = `https://github.com/${SITE.githubUser}`;

// Link com TODO não aparece na tela.
export const hasValue = (value) => Boolean(value) && value !== "TODO";
