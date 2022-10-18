const SiteRouter = require('./site')
const AuthRouter = require('./auth')
const UserRouter = require('./user')
const ContactRouter = require('./contact')


function route(app) {
  app.use("/", SiteRouter);
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/contact", ContactRouter)
}

module.exports = route;
