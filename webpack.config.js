module.exports = {
    entry: "./public/js/main.js",
    output: {
        path: __dirname + "/public/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { 
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react']
                }
            },
            {
                    test: /\.jsx?$/, 
                    loader: 'jsx-loader'
            }
        ]
    }
};