const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie.controller");
const {
  createMovieValidator,
  updateMovieValidator,
  getMovieValidator,
  deleteMovieValidator,
} = require("../validators/movies.validator");

router.get("/", movie.findAll);
router.post("/", createMovieValidator, movie.create);
router.get("/:id", getMovieValidator, movie.findOne);
router.patch("/:id", getMovieValidator, updateMovieValidator, movie.update);
router.delete("/:id", deleteMovieValidator, movie.delete);

module.exports = router;
