const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
});

export const formatDate = (isoDate) => DATE_FORMAT.format(new Date(isoDate));
