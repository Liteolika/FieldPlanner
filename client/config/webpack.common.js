var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");


module.exports = {
  entry: {
    "polyfills": "./client/src/polyfills.ts",
    "vendor": "./client/src/vendor.ts",
    "app": "./client/src/main.ts"
  },

  resolve: {
    extensions: [".ts", ".js", ".scss", ".less"]
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
      /*{
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          { 
            loader: "file-loader?name=assets/[name].[hash].[ext]", 
            options: {
              attrs: ["img:src", "img:data-src", "link:data-src"]
            } 
          }
          
        ]
        
      },*/
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

  },

  plugins: [

// Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root("client", "src"), // location of your src
      {} // a map of your routes
    ),

    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root("client", "src"), // location of your src
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),

    new HtmlWebpackPlugin({
      template: "client/src/index.html"
    }),

    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether"
        })
    ]
};
