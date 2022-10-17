const SiteRouter = require('./site')
const AuthRouter = require('./auth')


function route(app) {
  app.use("/", SiteRouter);
  app.use("/auth", AuthRouter);
}

module.exports = route;
