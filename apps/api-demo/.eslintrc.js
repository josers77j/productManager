module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Asegura que Prettier se ejecute como parte de ESLint
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Reglas de TypeScript existentes
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Reglas de Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // Usar comillas simples
        semi: true, // Usar punto y coma
        trailingComma: 'es5', // Coma al final de objetos y arrays
        printWidth: 80, // Longitud máxima de línea
        tabWidth: 2, // Tamaño de tabulación
      },
    ],
  },
};
