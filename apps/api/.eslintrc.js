module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
  },
};
