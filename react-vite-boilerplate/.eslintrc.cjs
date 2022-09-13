module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    // 'arrow-body-style': ['error', 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'default-param-last': 0, // 기본값을 반드시 뒤로 하지 않는 게 더 깔끔해서 설정. (특히 객체로 되어있지 않을 때 불편함)
    'react/require-default-props': 0, // prop을 조건부로 설정하기 위해 설정
    'react/destructuring-assignment': 0, // 항상 destructuring하지 않아도 괜찮도록 설정
    'consistent-return': 0, // useEffect cleanup 함수에서 굉장히 불편함을 느끼므로 설정
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
