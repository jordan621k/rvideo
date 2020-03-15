module.exports = {
  module: {
    rules: [
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}