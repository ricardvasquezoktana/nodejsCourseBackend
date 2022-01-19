const express = require("express");
const moviesRouter = require("../routes/movies.route");
const reviewsRouter = require("../routes/reviews.route");
const usersRouter = require("../routes/users.route");

function routerApi(app) {
  const router = express.Router();
  app.use("api/v1", router);
  router.use("/movies", moviesRouter);
  router.use("/reviews", reviewsRouter);
  router.use("/users", usersRouter);
}

module.exports = routerApi;
