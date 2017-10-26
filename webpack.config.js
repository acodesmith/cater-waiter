const webpack               = require('webpack');
const path                  = require('path');
const BASE_DIR              = path.resolve('./');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        "dist/admin": BASE_DIR + '/resources/scripts/admin.js',
        "dist/front-end": BASE_DIR + '/resources/scripts/front-end.js',
        "dist/online-orders": BASE_DIR + '/resources/component/online-orders/index.js',
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    devtool: '#source-map',
    module : {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },{
                test: /\.js$/,
                exclude: /(node_modules|build)/,
                loader: 'eslint-loader'
            },{
                test : /\.js$/,
                exclude: /(node_modules)/,
                loader : 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['stage-2', 'es2015' ],
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