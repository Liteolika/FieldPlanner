var webpackConfig = require("./webpack.test");

module.exports = function (config) {
  var _config = {
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      {pattern: "./client/config/karma-test-shim.js", watched: false}
    ],

    preprocessors: {
      "./client/config/karma-test-shim.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        chunks: false
      },
      noInfo: true
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      require("karma-webpack")
    ],


/*    plugins: [
      'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher'
    ],*/

    /*plugins: [
      "karma-spec-reporter"
    ],*/

    specReporter: {
        maxLogLines: 15,             // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        suppressFailed: false,      // do not print information about failed tests
        suppressPassed: false,      // do not print information about passed tests
        suppressSkipped: true,      // do not print information about skipped tests
        showSpecTiming: false,      // print the time elapsed for each spec
        failFast: false              // test would finish with error when a first fail occurs. 
      },

    reporters: [
      "progress", 
      "spec",
      "dots",
      "coverage"
    ],

    coverageReporter: {
      reporters: [
        { type: "json", subdir: ".", file: "coverage-final.json" }
      ]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [ 
      "PhantomJS" 
    ],
    singleRun: false,
    autoWatch: true,
    autoWatchBatchDelay: 300
  };

  config.set(_config);
};
