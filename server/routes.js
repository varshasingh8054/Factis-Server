const userRouter = require('../api/users/router');
const adminRouter = require('../api/admin/router');

module.exports = function routes(app) {
  app.use('/api/users', userRouter);
  app.use('/api/admin', adminRouter);
}