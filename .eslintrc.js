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
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/method-signature-style": ["error", "method"],
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/unified-signatures": "off",
    "mocha/no-exports": "off",
    "mocha/no-setup-in-describe": "off",
    "tsdoc/syntax": "error",

    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: {
          memberTypes: [
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "static-field",
            "public-static-get",
            "protected-static-get",
            "private-static-get",
            "static-get",
            "public-static-set",
            "protected-static-set",
            "private-static-set",
            "static-set",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "static-method",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "public-abstract-field",
            "protected-abstract-field",
            "private-abstract-field",
            "public-field",
            "protected-field",
            "private-field",
            "instance-field",
            "abstract-field",
            "field",
            "signature",
            "public-constructor",
            "protected-constructor",
            "private-constructor",
            "constructor",
            "public-instance-get",
            "protected-instance-get",
            "private-instance-get",
            "public-abstract-get",
            "protected-abstract-get",
            "private-abstract-get",
            "public-get",
            "protected-get",
            "private-get",
            "instance-get",
            "abstract-get",
            "get",
            "public-instance-set",
            "protected-instance-set",
            "private-instance-set",
            "public-abstract-set",
            "protected-abstract-set",
            "private-abstract-set",
            "public-set",
            "protected-set",
            "private-set",
            "instance-set",
            "abstract-set",
            "set",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "public-abstract-method",
            "protected-abstract-method",
            "private-abstract-method",
            "public-method",
            "protected-method",
            "private-method",
            "instance-method",
            "abstract-method",
            "method",
          ],
          order: "alphabetically",
        },
      },
    ],
  },
};
