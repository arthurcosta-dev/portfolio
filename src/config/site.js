// Dados pessoais e textos fixos ficam só aqui. TODO = valor que o Arthur ainda vai informar.
export const SITE = {
  name: "Arthur Costa",
  githubUser: import.meta.env.VITE_GITHUB_USER ?? "arthurcosta-dev",
  email: "arthurcgcosta@hotmail.com",
  linkedinUrl: "https://www.linkedin.com/in/arthurcosta-dev",
  headline:
    "Desenvolvedor front-end em formação, procurando estágio em desenvolvimento web.",
  about: {
    statement:
      "Estudo Engenharia de Software na FIAP e me dedico ao front-end: interface, detalhes e como a página se comporta no celular.",
    goal: "Gosto de trabalho organizado e explicado: neste site, as decisões estão documentadas, o código tem testes e os commits seguem um padrão.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    education:
      "1º ano de Engenharia de Software, com foco em front-end. Inglês avançado (C1) e estudando francês.",
    objective: "Objetivo: estágio em desenvolvimento web.",
    github: "Os repositórios públicos reúnem os projetos que construí.",
  },
  contact: {
    quick: "Escreva ou chame por onde preferir.",
    invitation:
      "Estou procurando estágio em desenvolvimento web. Mande uma mensagem ou use os links no rodapé.",
    sent: "Mensagem enviada. Obrigado pelo contato!",
    failed: "A mensagem não foi enviada. Confira sua conexão e tente de novo.",
  },
};

export const GITHUB_URL = `https://github.com/${SITE.githubUser}`;
