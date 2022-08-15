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
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "mocha/no-setup-in-describe": "off",
    "tsdoc/syntax": "error",
  },
};
