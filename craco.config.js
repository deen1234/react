const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            enforce: 'pre',
            use: [
              {
                loader: 'eslint-loader',
                options: {
                  jsConfigFile: 'jsconfig.json',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
    },
  },
};
