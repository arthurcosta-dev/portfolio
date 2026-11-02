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
    technologies: [
      "React",
      "JavaScript",
      "HTML e CSS",
      "Tailwind CSS",
      "Vite",
      "Git",
    ],
    profile: [
      { label: "Formação", value: "Engenharia de Software, FIAP (1º ano)" },
      { label: "Idiomas", value: "Inglês avançado (C1), francês em estudo" },
      { label: "Foco", value: "Front-end" },
    ],
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
