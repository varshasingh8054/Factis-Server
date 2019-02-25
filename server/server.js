const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const helmet = require('helmet');
const os = require('os');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const swaggerify = require('../swagger');
const routes = require('./routes');
const config = require('config');
const addRequestId = require('express-request-id')();
const logger = require('../lib/logger');
//const cors = require('cors');

const app = new Express();

class ExpressServer {
  constructor() {
    console.log(config.smtpConfig);
    //mongoose.connect(config.mongoUrl).then(res => console.log("dn connected :" + config.mongoUrl));;
    const root = path.normalize(`${__dirname}/..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(addRequestId);
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
      next();
    });
    // initialize all routes
    routes(app);
   // require('./passport')(app);    
    app.use(helmet());
    // app.use(cors());
    app.use(Express.static(`${root}/public`));
    app.use(function (req, res, next) {
      var log = logger.loggerInstance.child({
        id: req.id,
        body: req.body
      }, true)
      log.info('request : ', { reqId: req.id, reqBody: req.body })
      next();
    });
    app.use(function (req, res, next) {
      function afterResponse() {
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);
        var log = logger.loggerInstance.child({
          id: req.id
        }, true)
        //log.info({ res: res }, 'response')
      }
      res.on('finish', afterResponse);
      res.on('close', afterResponse);
      next();
    });
    app.use(this.errHandlerMiddleware);
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  errHandlerMiddleware(err, req, res, next) {
    res.send({ status: 0, code: 404, message: err.message, err: err });
  }

  connection() {
    try{
      mongoose.connect(config.mongoUrl);
      mongoose.set('debug', true);
      var collections = mongoose.connections[0].collections;
      var names = [];
      Object.keys(collections).forEach(function (k) {
        names.push(k);
      });
      console.log(names);
      return this;
    }catch(err){
      console.log("connection error", err)
    }
   
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => console.log(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
module.exports = ExpressServer;
