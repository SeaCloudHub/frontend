module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
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
