const SiteRouter = require('./site')
const AuthRouter = require('./auth')
const UserRouter = require('./user')


function route(app) {
  app.use("/", SiteRouter);
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
}

module.exports = route;
