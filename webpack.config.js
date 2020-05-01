const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {  // 开发服务器的配置
        port: 3000,
        progress: true,
        contentBase: "./dist",
        compress: true
        // hot: true
    },
    mode: 'development',
    entry: './src/index.js',  // 入口
    output: {
        filename: 'bundle.[hash:8].js',  // 打包后的文件名, hash戳8位
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
    },
    plugins: [  // 数组  放着所有的webpack插件
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {  //压缩html
            //     removeAttributeQuotes: true,   // 删除html双引号
            //     collapseWhitespace: true  // 删除空格
            // },
            hash: true
        })
    ]
}