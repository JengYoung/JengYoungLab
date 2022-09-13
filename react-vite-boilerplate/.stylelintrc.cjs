module.exports = {
  customSyntax: '@stylelint/postcss-css-in-js',
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-empty-first-line': null, // literal template에서 '`'기호 다음에 바로 스타일 코드가 붙여지지 않도록!
  },
};
