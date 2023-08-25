module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
  root: true,
};
