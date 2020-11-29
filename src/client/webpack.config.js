const path = require('path');

module.exports = {
  entry: './pkg/main.js',
  performance: {
    hints: false,
    maxEntrypointSize: 1048576,
    maxAssetSize: 1048576,
  },
  output: {
    filename: 'piccolo-client.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
