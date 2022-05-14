module.exports = {
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: ['../../.eslintrc.js', '.eslintrc-auto-import.json'],
  rules: {
    'vue/require-explicit-emits': 0
  }
}
