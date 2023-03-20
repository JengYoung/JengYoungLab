const path = require('path');


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.resolve.extensions = [...config.resolve.extensions, '.js', '.jsx']
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../src/components"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@contexts": path.resolve(__dirname, "../src/contexts"),
      "@pages": path.resolve(__dirname, "../src/pages"),
    }

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, '../src'),
      use: {
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    })

    return config
  }
}