const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		assetModuleFilename: "assets/[hash][ext][query]",
	},
	mode: "development",
	watch: true,
	resolve: {
		extensions: [".js"],
		alias: {
			"@utils": path.resolve(__dirname, "src/utils/"),
			"@templates": path.resolve(__dirname, "src/templates/"),
			"@styles": path.resolve(__dirname, "src/styles/"),
			"@images": path.resolve(__dirname, "src/assets/images/"),
			"@fonts": path.resolve(__dirname, "src/assets/fonts/"),
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css|.styl$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[hash][ext][query]",
				},
			},
			{
				test: /\.(woff2?|ttf|eot)(\?v=\w+)?$/,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][contenthash][ext][query]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "assets/[name].[contenthash].css",
		}),
		new Dotenv(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images",
				},
			],
		}),
	],
};
