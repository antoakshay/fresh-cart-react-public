module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // Downgrading errors to warnings (yellow)
    'no-unused-vars': 'warn', // Turn unused vars error into warning
    semi: 'warn', // Turn missing semicolon error into warning
    'no-console': 'warn', // Turn console usage error into warning
    eqeqeq: 'warn', // Turn strict equality enforcement into warning

    // Specific React-related rules set to warning
    'react-refresh/only-export-components': [
      'warn', // Always show this rule as a warning
      { allowConstantExport: true },
    ],

    // Add more rules as needed
    'react/prop-types': 'warn', // Turn prop-types error into warning
  },
};
