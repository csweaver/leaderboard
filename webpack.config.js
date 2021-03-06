module.exports = {
  context: __dirname + "/src",
  entry: "./root",
  output: {
    path: __dirname,
    filename: "index.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}

