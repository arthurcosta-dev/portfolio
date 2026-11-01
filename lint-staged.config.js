export default {
  "*.{js,jsx,mjs}": ["eslint --fix", "prettier --write"],
  "*.{css,html,json,md,yml}": "prettier --write --ignore-unknown",
};
