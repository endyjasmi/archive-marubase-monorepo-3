module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:prettier/recommended",
    "plugin:mocha/recommended",
  ],
  env: { node: true },
  parserOptions: {
    ecmaVersion: "latest",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["tsdoc"],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-definitions": "off",
    "tsdoc/syntax": "error",
  },
};
