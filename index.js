require('./server/env');
const Server = require('./server/server');
const routes = require('./server/routes');

new Server()
  .router(routes).connection()
  .listen(process.env.PORT);

process.on('uncaughtException', function (err) {
  console.log("UncaughtException: ",err)
});

process.on('unhandledRejection', function(reason, p){
  console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
