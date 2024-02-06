module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        jsxSingleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        useTabs: false,
        endOfLine: 'auto',
        printWidth: 130,
        bracketSameLine: true,
      },
    ],
  },
};
