function route(app) {
  app.use("/news", newsRouter);

  app.use('/courses', coursesRouter);
  
  app.use('/me', meRouter);

  app.use("/", siteRouter);
}

module.exports = route;
