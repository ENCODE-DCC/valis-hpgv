const path = require('path');
const webpack = require("webpack");

const outputDirectory = `${__dirname}/dist`;

module.exports = (env) => {
    env = env || {};

    let releaseMode = !!(env.production || env.deploy);

    const config = {
        mode: releaseMode ? "production" : "development",

        context: path.resolve(__dirname, "src"),
        
        entry: "./index",
        output: {
            path: outputDirectory,
            filename: '../index.js',
            library: '',
            libraryTarget: 'commonjs',
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: releaseMode ? false : "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader",
                    exclude: [path.resolve(__dirname, "node_modules")],
                },
                // convert binary files into data-urls and embed into the output
                {
                    test: /\.bin/,
                    loader: 'url-loader'
                }
            ]
        },

        plugins: [
            // pass --env to javascript build via process.env
            new webpack.DefinePlugin({ "process.env": JSON.stringify(env) }),
        ],

        externals: {
            react: 'react',
            reactDOM: 'reactDOM',
        }
    }

    return config;
};
