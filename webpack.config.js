const webpack               = require('webpack');
const path                  = require('path');
const BASE_DIR              = path.resolve('./');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        "dist/admin": BASE_DIR + '/resources/scripts/admin.js',
        "dist/front-end": BASE_DIR + '/resources/scripts/front-end.js',
        "dist/online-orders": BASE_DIR + '/resources/scripts/online-orders.js',
        "dist/woocommerce": BASE_DIR + '/resources/scripts/woocommerce.js',
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    performance: {
        hints: false
    },
    devtool: '#source-map',
    module : {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|build)/,
                loader: 'eslint-loader'
            },{
                test : /\.jsx?$/,
                exclude: /(node_modules)/,
                loader : 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['react', 'es2015', 'stage-2'],
                }
            },{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'dist/',
                    publicPath: '/wp-content/plugins/cater-waiter/',
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin( '[name].css' ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ]
};

if (process.env.NODE_ENV === 'production') {

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}