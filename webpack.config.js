const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const path = require('path');
const outputFolder = process.env.NODE_ENV === 'preview' ? 'preview/' : process.env.NODE_ENV === 'localpreview' ? 'localpreview/' : 'dist/';
const repoName = 'ai2html-builder';
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
        transform(content) {
            if (process.env.NODE_ENV === 'preview') {
                // this modifies the content of the files being copied; here making sure url('/...') is changed so that it will
                // work on gitHub pages where oublic path is /{repoName}/
                // also changes references to 'pew' to refer to 'Pew'
                return content.toString().replace(/url\("\/([^/])/g, 'url("/' + repoName + '/$1').replace(/\/pew\//g, '/Pew/');
            } else {
                return content.toString();
            }
        }
    }]);

const plugins = [
    new HtmlWebpackPlugin({
        title: '[Title]',
        subtitle: '[Subtitle]',
        chunks: ['index'],
        template: './src/index-70-30.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        title: '[Title]',
        subtitle: '[Subtitle]',
        chunks: ['index'],
        template: './src/index-100.html',
        filename: './full/index.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        title: 'Viewports',
        chunks: ['viewport'],
        subtitle: '',
        template: './src/viewports.ejs',
        filename: './viewports/index.html',
    }),
    new HtmlWebpackPlugin({
        title: 'Readme',
        chunks: ['readme'],
        subtitle: '',
        template: './src/readme.ejs',
        filename: './readme/index.html',
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
        test: /\.(png|jpe?g|svg)$/i,
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
    {
        test: /\.md$/,
        use: [{
            loader: 'html-loader'
        },
        {
            loader: 'markdown-loader',
            options: {
                smartypants: true,
                gfm: true
            }
        }]
    }
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
         //   full: './src/index.js',
            viewports: './src/viewports.js',
            readme: './src/readme.js'
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