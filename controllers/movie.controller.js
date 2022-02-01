const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.findAll = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    console.log({ movies });
    res.status(200).json({ movies });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports.create = async (req, res, next) => {
  try {
    const { title, username, rating, review } = req.body;
    const movie = await Movie.findOne({
      title,
    }).exec();
    if (movie != null) {
      res.status(404).json({ error: "Movie already exists" });
      return;
    }
    const newMovie = await new Movie({
      title,
      username,
    }).save();
    res.status(201).json({ newMovie });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports.findOne = async (req, res, next) => {
  try {
    const { _id: id } = req.params;
    const movie = await Movie.findOne({
      id,
    }).exec();
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }
    res.status(200).json({ movie });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const movie = await Movie.findOneAndUpdate(id, update, {
      returnOriginal: false,
    });
    res.status(200).json({ movie });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Movie.deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      res.status(200).json({ success: "OK", message: "Movie deleted", id });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
