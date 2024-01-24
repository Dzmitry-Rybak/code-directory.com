module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@next/next/recommended',
      'plugin:react-hooks/recommended'
    ],
    settings: {
      react: {
        version: 'detect'
      }
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: [
      'react',
      '@next/next'
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'no-constant-condition': 'warn',
      'react/no-unescaped-entities': 'warn',
    }
  };
  