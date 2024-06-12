import antfu from "@antfu/eslint-config";

export default antfu({
  unocss: true,
  vue: true,
  typescript: true,
  markdown: false,

  stylistic: {
    quotes: "double",
    semi: true,
  },

  rules: {
    curly: "off",
  },
});
