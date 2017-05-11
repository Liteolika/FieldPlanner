var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
  devtool: "inline-source-map",

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: "awesome-typescript-loader",
          options: { configFileName: helpers.root("tsconfig.json") }
        } , "angular2-template-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader?interpolate",
        options: {
          attrs: ['img:src', 'link:href', "link:data-src"]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|mp4|webm)$/,
        use: [
            { loader: "url-loader?limit=10000" }
        ]
      },
      {
        test: /\.css$/,
        exclude: helpers.root("client","src", "app"),
        loader: ExtractTextPlugin.extract({ fallback: "style-loader", loader: "css-loader?sourceMap" })
      },
      {
        test: /\.css$/,
        include: helpers.root("client", "src", "app"),
        loader: "raw-loader"
      },
      {
        test: /\.less$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
      }
    ]
    
  }
}
