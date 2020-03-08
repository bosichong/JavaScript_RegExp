const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require("extract-text-webpack-plugin");

//由于现在新版本的 clean-webpack-plugin 插件引入已经改为:
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// new CleanWebpackPlugin(),//清理目录 而且不用加入目录数组['dist']
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");

const common = require('./webpack.common.js');

let prodConfig = {
    mode: 'production',
    module: {
        rules: [

            {
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader"],
					publicPath: "../"

				})
            },
            {
				test: /\.less$/,
				use: extractTextPlugin.extract({
					fallback:"style-loader",
					use: ["css-loader", "less-loader"]
				})
			},
        ]

	},
    plugins: [
		new CleanWebpackPlugin(), //清理目录
		
		new extractTextPlugin('css/[name].css'),
		// copy静态资源到指定目录
		new copyWebpackPlugin([{
			from:path.resolve(__dirname,"src/js/lib"),
			to:'./js/lib'
		}])
    ]
};

module.exports = merge(common, prodConfig);