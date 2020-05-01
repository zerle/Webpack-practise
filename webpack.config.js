const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devServer: {  // 开发服务器的配置
        port: 3000,
        progress: true,
        contentBase: "./dist",
        compress: true
        // hot: true
    },
    optimization: {  // 优化CSS
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
    mode: 'production',
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
        }),
        new MiniCssExtractPlugin({  //抽离css样式插件
            filename: 'main.css'
        })
    ],
    module: { // 模块
        rules: [  // 规则 css-loader 解析 @import 这种语法的
            // style-loader  它是把css插入到head的标签中
            // loader的用法 字符串只用一个loader
            // 多个loader需要 []
            // loader的顺序 默认是从右向左执行, 或从下到上

            // {
            //     test: /.css$/,
            //     use: ["style-loader","css-loader"]
            // }
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                autoprefixer({ //添加css浏览器前缀
                                    "overrideBrowserslist": ['> 0.15% in CN']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }
}