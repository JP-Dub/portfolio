const NightOwlHandler = require('../controllers/nightOwlHandler.server'),
      ClickHandler    = require('../controllers/clickHandler.server');

const path = require('path')
const base = process.cwd();

module.exports = (app, cors) => {
    const whitelist = /(https:\/\/)?codepen\.io\/J-Dub\/(\w+\/.+)/g;
    
    let nightOwlHandler = new NightOwlHandler(),
        clickHandler    = new ClickHandler();

    const isLoggedIn = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/');
      }
    };          
  
    const corsOptions = (req, callback) => {
      let origin = req.get('Access-Control-Allow-Origin');
      
      if (origin.match(whitelist) && 
          req.header('origin') === 'https://cdpn.io'|| 
          req.header('origin') === 'https://s.codepen.io' ||
          req.header('origin') === 'https://localhost:3000') { 
        callback(null, {
          origin : ['https://cdpn.io', 'https://s.codepen.io'],
          methods: ['GET', 'POST'],
          allowedHeaders : ['Acces-Control-Allow-Origin', 'X-Requested-With', 'Content-Type'],
          credentials: true
        })
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }   

    app.get('/', (req, res) => {
      res.sendFile(path.resolve(base, './views/index.html'));
    }); 

    app.get('/davinci', (req, res) => { 
        res.sendFile(path.resolve(base, './public/index.html'));
    }); 

    app.get('/react/drum_machine', (req, res) => {
        res.sendFile(path.resolve(base, './react/drum_machine/index.html'));
    });   

    app.get('/react/night_owls', (req, res) => {
      res.sendFile(path.resolve(base, './react/night_owls/index.html'));
      });  
    
    app.get('/react/weatherstack', (req, res) => {
      res.sendFile(path.resolve(base, './react/weatherstack/index.html'));
      });         

    app.route('/query/weatherstack')
      .post(cors(corsOptions), clickHandler.weatherstack);
         
    ///// --> Night Owl Routes <-- /////
    // app.get('/demo', (req, res) => {
    //   res.redirect('/night_owls/rsvp/demo');
    //   });
   
    app.route('/user/:location' )	
      .get( nightOwlHandler.userLocation );
        
    app.route('/businesses/:search' )
      .post( nightOwlHandler.getNightlife );
    
    app.route('/rsvp/clicks' )
      .get(  nightOwlHandler.getClicks )
      .post( isLoggedIn, nightOwlHandler.addClick );	
    
    app.route('/resetRSVP')
      .put( nightOwlHandler.resetRSVP );  
      
    // app.get('/auth/twitter', passport.authenticate( 'twitter' ) );
  
    // app.route('/auth/twitter/callback' )
    //   .get( passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
    //       (req, res) => {
    //         res.redirect('/login/' + req.user.twitter['username']);
    //   });	
    
}

// process.cwd(), __dirname, __filename

// process.cwd() === F:\node.js\Portfolio

// path.resolve(__dirname, './server') === F:\node.js\Portfolio\app\routes\server

// path.resolve(__dirname, 'server') === F:\node.js\Portfolio\app\routes\server

// path.resolve(__dirname, '../server) === F:\node.js\Portfolio\app\server

// path.join(__dirname, './server') === F:\node.js\Portfolio\app\routes\server

    // app.get('/weatherstack', (req, res) => {
    //     res.sendFile(path + '/weatherstack/index.html');
    // });

    // app.get('/drum_machine', (req, res) => {
    //     res.sendFile(path + '/drum_machine/index.html');
    // });

    // app.get('/davinci', (req, res) => {    
    //     console.log('sending over a davinci')  
    //     res.sendFile(path.resolve(__dirname, '../../app/da vinci/index.html'));
    // });