const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV;
const path = require('path');
const outputFolder = process.env.NODE_ENV === 'preview' ? 'preview/' : process.env.NODE_ENV === 'localpreview' ? 'localpreview/' : 'dist/';

const copyWebpack =
    new CopyWebpackPlugin([{
        from: '**/*.png',
        context: 'src',
        to: ''
    },{
        from: '**/*.jpg',
        context: 'src',
        to: ''
    },
    {
        from: '**/*.svg',
        context: 'src',
        to: ''
    },
        {
        from: '-/',
        context: 'src',
        to: '-/'
    },  {
        from: 'assets/',
        context: 'src',
        to: 'assets/',
        ignore: ['Pew/css/**/*.*']
    }, {
        from: 'assets/Pew/css/',
        context: 'src',
        to: 'assets/Pew/css/',
    }]);

const plugins = [
    new HtmlWebpackPlugin({
        title: '[Title]',
        subtitle: '[Subtitle]',
        chunks: ['index'],
        template: process.env.column == 'full' ? './src/index-100.html' : './src/index-70-30.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        title: 'Viewports',
        chunks: ['viewport'],
        subtitle: '',
        template: './src/viewports.ejs',
        filename: './viewports/index.html',
    }),
];
function returnJSUse() {
    return [{
        loader: 'eslint-loader'
    }];
}
const rules = [

    {
            test: /\.js$|\.mjs$/,
            use: returnJSUse()
        },
    
    {
        test: /\.scss$/,
        exclude: /src\/css\/styles\.scss$/,
        use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        mode: 'local',
                        localIdentName: '[path][local]'
                    },
                    sourceMap: true,
                    importLoaders: 1
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
    },{
        test: /src\/css\/styles\.scss$/,
        use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        mode: 'global',
                    },
                    sourceMap: true,
                    importLoaders: 1
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
    },
    {
        test: /ai2html-output.*\.(png|jpe?g|svg)$/i,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 2000000,
                fallback: 'file-loader',
                esModule: false

            }
        }]
    },
   
    {
        test: /\.html$/,
        exclude: /index.*\.html/,
        use: 'html-loader'
    },
];

plugins.push(copyWebpack);
plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = () => {
    return {
        devServer: {
            hot: true
        },
        devtool: 'eval-source-map',
        entry: {
            index: './src/index.js',
            viewports: './src/viewports.js'
        },
        mode,
        module: {
            rules
        },
        output: {
            path: __dirname + '/' + outputFolder,
            filename: '[name].js?v=[hash:6]',
            chunkFilename: '[name].[id].js',
        },
        plugins,
        resolve: {
            alias: {
                "@Submodule": path.resolve('submodules'),
                "@Project": path.resolve('src')
            }
        },
    }
};