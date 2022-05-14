const isDev = process.env.NODE_ENV !== 'production'
const enableOnlyDev = (state = 2) => (isDev ? 0 : state)

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': enableOnlyDev(),
    'no-debugger': enableOnlyDev(),
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/ban-types': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-param-reassign': 0
  }
}
