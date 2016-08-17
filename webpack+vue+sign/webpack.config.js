var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './src/main.js'
    ], //入口文件
    output: {
        path: './dist', //页面引用路径
        publicPath: 'dist/', //生成文件路径
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
				test: /\.vue$/,
				loader: 'vue'
			},
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                include: path.join(__dirname, '.')
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()

    ]
} else {
    module.exports.devtool = '#source-map'
}