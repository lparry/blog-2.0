import path from "path"
import webpack from "webpack"
import merge from "lodash.merge"
import postcssImport from "postcss-import"
import precss from "precss"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const isDebug = !(process.argv.includes("--release") || process.argv.includes("-r"))
const isVerbose = process.argv.includes("--verbose") || process.argv.includes("-v")

// sometimes babel is retarded and tries to import css instead of letting webpack do it
require.extensions[".scss"] = () => undefined
require.extensions[".css"] = () => undefined

const WATCH = global.watch
const JS_LOADER = {
  test: /\.jsx?$/,
  include: [
    path.resolve(__dirname, "../components"),
    path.resolve(__dirname, "../core"),
    path.resolve(__dirname, "../pages"),
    path.resolve(__dirname, "../pages/blog"),
    path.resolve(__dirname, "../app.js"),
    path.resolve(__dirname, "../config.js"),
  ],
  loader: `babel-loader!${path.join(__dirname, "./lib/flickr-url-loader.js")}!${path.join(__dirname, "./lib/tag-loader.js")}`,
}

// Base configuration
const config = {
  output: {
    path: path.join(__dirname, "../build"),
    publicPath: "/",
    sourcePrefix: "  ",
  },
  cache: false,
  debug: isDebug,
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isDebug ? "\"development\"" : "\"production\"",
      __DEV__: isDebug,
    }),
  ],
  module: {
    loaders: [
      {
        test: /[\\\/]app\.js$/,
        loader: path.join(__dirname, "./lib/routes-loader.js"),
      },
      {
        test: /[\\\/]pages\/index\.jsx?$/,
        loader: `${path.join(__dirname, "./lib/paginated-blog-intro-loader.js")}!${path.join(__dirname, "./lib/pagination-page-creator-loader.js")}`,
      },
      {
        test: /[\\\/]pages\/tags\/.*\.jsx?$/,
        loader: path.join(__dirname, "./lib/tag-page-loader.js"),
      },
      {
        test: /[\\\/]pages\/page\/\d+\.jsx?$/,
        loader: path.join(__dirname, "./lib/paginated-blog-intro-loader.js"),
      },
      // {
      //   test: /[\\\/]pages\/page\/\d+\.jsx?$/,
      //   loader: path.join(__dirname, "./lib/paginated-blog-intro-loader.js"),
      // },
      // {
      //   test: /[\\\/]pages\/blog(\/.*)?\.jsx?$/,
      //   loader: path.join(__dirname, "./lib/blog-loader.js"),
      // },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.txt$/,
        loader: "raw-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url-loader?limit=10000",
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: "file-loader",
      },
    ],
  },
  postcss: function plugins(bundler) {
    return [
      postcssImport({ addDependencyTo: bundler }),
      precss(),
      autoprefixer({
        browsers: ["last 2 versions"],
      }),
    ]
  },
}

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: [
    "babel-loader",
    ...(WATCH ? ["webpack-hot-middleware/client"] : []),
    "./app.js",
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    module: "empty",
  },
  output: {
    filename: "app.js",
  },
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? "#cheap-module-eval-source-map" : false,
  plugins: [
    ...config.plugins,
    ...(isDebug ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: isVerbose,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ]),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
    new ExtractTextPlugin("styles.css", { allChunks: true }),
    function () { // eslint-disable-line func-names
      this.plugin("done", (stats) => {
        require("fs").writeFileSync( // eslint-disable-line global-require
                                    path.join(__dirname, "..", "webpackStats.json"),
                                    JSON.stringify(stats.toJson(), null, 2))
      })
    },
  ],
  module: {
    loaders: [
      WATCH ? Object.assign({}, JS_LOADER, {
        query: {
          // Wraps all React components into arbitrary transforms
          // https://github.com/gaearon/babel-plugin-react-transform
          plugins: ["react-transform"],
          extra: {
            "react-transform": {
              transforms: [
                {
                  transform: "react-transform-hmr",
                  imports: ["react"],
                  locals: ["module"],
                }, {
                  transform: "react-transform-catch-errors",
                  imports: ["react", "redbox-react"],
                },
              ],
            },
          },
        },
      }) : JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!postcss"),
      },
    ],
  },
})

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: [
    "babel-loader",
    "./app.js",
  ],
  output: {
    filename: "app.node.js",
    libraryTarget: "commonjs2",
  },
  target: "node",
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: /^[a-z][a-z\.\-\/0-9]*$/i,
  plugins: config.plugins.concat([
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new ExtractTextPlugin("styles.css", { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    function () { // eslint-disable-line func-names
      this.plugin("done", (stats) => {
        require("fs").writeFileSync( // eslint-disable-line global-require
          path.join(__dirname, "..", "webpackStats.json"),
          JSON.stringify(stats.toJson(), null, 2))
      })
    },
  ]),
  module: {
    loaders: [
      JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!postcss"),
      },
    ],
  },
})

export default [appConfig, pagesConfig]
