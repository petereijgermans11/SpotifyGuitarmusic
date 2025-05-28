const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config, env) {
  if (env === 'production') {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            keep_classnames: true, // Preserve class names
            keep_fnames: true, // Preserve function names
          },
          compress: {
            keep_classnames: true, // Preserve class names during compression
            keep_fnames: true, // Preserve function names during compression
          },
        },
      }),
    ];
  }
  return config;
};