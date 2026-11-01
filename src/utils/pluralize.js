export const pluralize = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : plural}`;
