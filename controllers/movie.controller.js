const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.findAll = (req, res, next) => {};
module.exports.create = async (req, res, next) => {
  try {
    const { title, username, rating, review } = req.body;
    const movie = await Movie.findOne({
      title,
    }).exec();
    if (!movie) {
      res.status(404).json({ error: "Movie already exists" });
      return;
    }
    const newMovie = await new Movie({
      title,
      username,
      rating,
      review,
    }).save();
    res.status(201).json({ newMovie });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports.findOne = (req, res, next) => {};
module.exports.update = (req, res, next) => {};
module.exports.delete = (req, res, next) => {};
