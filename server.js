const express = require('express'),
      session = require('express-session'),  
      routes  = require('./app/routes/index.js'),
      proxy   = require('http-proxy-middleware'),
      bodyParser = require('body-parser'),
      https   = require('https'),
      cors    = require('cors'),
      fs      = require('fs');
      
require('dotenv').config();      

const app = express();

// setup webpack dev server and https localhost
const options = {
    key : fs.readFileSync('rootCA.key'),
    cert: fs.readFileSync('rootCA.crt'),
    passphrase: process.env.PASSPHRASE
}

const WebpackDevServer = require('./node_modules/webpack-dev-server/lib/Server'),
      webpackConfig = require('./webpack.config'),
      Webpack  = require('webpack'),
      compiler = Webpack(webpackConfig);
      
const devServerOptions = Object.assign({}, webpackConfig.devServer),
      server   = new WebpackDevServer(compiler, devServerOptions),
      client   = https.createServer(options, app),
      port     = 3000;
         
app.use(cors());

app.use('/api', proxy(
    { 
    target: 'https://localhost:3000', 
    pathRewrite : {'^/api' : ''},
    secure: false
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1);
app.use(session({
    secret: 'secretlocalhost:8080',
    cookie: {
        secure  : true,
        sameSite: 'none'
    },
	resave: false,
	saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.static('dist'));

routes(app, cors);

const port2 = 8080;
//localhost:8080
client.listen(port, () => {
    console.log('Node.js Client listening on HTTPS port ' + port + '...');
});

localhost:3000
server.listen(port2, '127.0.0.1', (req, res) => {
	console.log('Webpack Server listening on port ' + port2 + '...');
});






//app.use(express.static('views'));
//app.use(express.static(path.join(__dirname, "app", "dist")));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// })