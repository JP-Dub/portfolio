const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: "cheap-source-map",
    devServer: {  
      allowedHosts: ['localhost'],

      compress: true,
      filename: '[name].bundle.js',
      historyApiFallback: true,
      host  : 'localhost',
      https : true,
      inline: true,
      port  : 8080,        
      proxy: {
         '/api' : {
           target: 'https://localhost:3000',
           pathRewrite : {'^/api' : ''},
           secure: false,
         },
      },
      public    : 'https://localhost:3000/react',
      publicPath: '/react/',
      stats     : 'normal',          
    },    
    entry: {
      weather     : "./react/weatherstack/script.js",        
      drum_machine: "./react/drum_machine/script.js",
      night_owls  : "./react/night_owls/script.js",
    },    
    mode: "development",
    module: {
        rules: [
           {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: [
                {
                  loader: 'babel-loader',
                  query : {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
              ]
           }, {
               test: /\.css$/i,
               include: path.resolve(__dirname, './public/css'),
               use: [
                   'style-loader',
                   'css-loader'
               ]
           }, {
            test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|ttf|mp3|ico)$/i,
            include: path.resolve(__dirname, './public'),
            rules: [
               {
                  loader: 'file-loader',
                  options: {
                     
                  },
               },
            ]
         },  
        ],
    },
    output: {
       path: path.join(__dirname, 'dist'),
       filename: '[name].bundle.js',
       publicPath: '/',
    }, 
    performance : {
      hints: false
    },   
    plugins: [ 
    ],    
    target: "node-webkit"
};

/*
in devServer ::
      public    : 'https://localhost:3000/react',
      publicPath: '/react/',
      stats     : 'normal',  
*/ 

//      entry: night_owls: "./app/night_owls/script.js",

//      publicPath: '/app/dist/',

//      new CleanWebpackPlugin(),

/* 
     before: function(app, server, compiler) {
       app.get('/', (req, res) => {
         res.sendFile(path.resolve(__dirname, './views/index.html'))
       })
     }, 
*/

/*
    entry: {
        weather     : "./react/weatherstack/script.js",        
        drum_machine: "./react/drum_machine/script.js",
        night_owls  : "./react/night_owls/script.js",
    },
*/

//contentBase : 'https://localhost:3000/dist',

/*
   plugins:[
      new HtmlWebpackPlugin({
         title: 'Weatherstack',
         filename: 'weatherstack.html',
         template: './react/weatherstack/index.html',
         inject: 'body',
         showErrors: true,
         cache : true
      }),
      new HtmlWebpackPlugin({
         title: 'Drum Machine 2020',
         filename: 'drum_machine.html',
         template: './react/drum_machine/index.html',
         inject: 'body',
         showErrors: true,
         cache : true
      }),  
      new HtmlWebpackPlugin({
         title: 'Night Owls',
         filename: 'night_owls.html',
         template: './react/night_owls/index.html',
         inject: 'body',
         showErrors: true,
         cache : true,
      }),           
   ],
*/

/*
               use: [
                 'file-loader',
                 'url-loader'
              ],
*/ 

/*
           {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                 presets: ['@babel/preset-env', '@babel/preset-react']
              }
*/

/*
{
               test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|ttf|mp3)$/i,
               include: path.resolve(__dirname, './public'),
               use: [
                  {
                     loader: 'file-loader',
                  },
               ]
            },
*/