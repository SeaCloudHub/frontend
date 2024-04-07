// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:prettier/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//     'prettier',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
//   rules: {
//     'unused-imports/no-unused-imports': 'warn',
//     'unused-imports/no-unused-vars': [
//       'warn',
//       {
//         vars: 'all',
//         varsIgnorePattern: '^_',
//         args: 'after-used',
//         argsIgnorePattern: '^_',
//       },
//     ],
//     'import/no-anonymous-default-export': 'off',
//     'prettier/prettier': [
//       'warn',
//       {
//         arrowParens: 'always',
//         jsxSingleQuote: true,
//         trailingComma: 'all',
//         tabWidth: 2,
//         semi: true,
//         singleQuote: true,
//         useTabs: false,
//         endOfLine: 'auto',
//         printWidth: 130,
//         bracketSameLine: true,
//       },
//     ],
//   },
// };

// module.exports = {
//   "env": {
//       "browser": true,
//       "es2021": true,
//       "jest": true
//   },
//   "extends": [
//       "react-app",
//       "react-app/jest",
//       "airbnb",
//       "airbnb-typescript",
//       "plugin:import/typescript",
//       "plugin:prettier/recommended"
//   ],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//       "ecmaFeatures": {
//           "jsx": true
//       },
//       "ecmaVersion": "latest",
//       "sourceType": "module",
//       "project": "./tsconfig.json"
//   },
//   "plugins": [
//       "react",
//       "@typescript-eslint",
//       "prettier"

//   ],
//   "rules": {
//       "react/react-in-jsx-scope": ["off"],
//       "react/jsx-uses-react": ["off"],
//       "react/jsx-props-no-spreading": ["warn"],
//       "react/no-unescaped-entities": ["off"]
//   }
// }

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
