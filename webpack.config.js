const path = require("path");

module.exports = {
	entry: "./lib/index.js",
	output: {
		filename: "dustjs-ast.js",
		path: path.join(__dirname, "./dist"),
		libraryTarget: "umd",
		library: "dustjs-ast"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=es2015&cacheDirectory=true"}
		]
	}
};
