const Joi = require("joi");

const title = Joi.string().alphanum();
const username = Joi.string().alphanum();
const id = Joi.string().alphanum().length(24);

const createMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      title: title.required(),
      username: username.required(),
    });
    const value = await movieSchema.validateAsync({
      title: req.body.title,
      username: req.body.username,
    });
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};

const getMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      id: id.required(),
    });
    const value = await movieSchema.validateAsync({
      id: req.params.id,
    });
    console.log({ value });
    next();
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: error.details[0].message });
  }
};

const updateMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      title,
      username,
    });
    const { title, username } = req.body;
    const value = await movieSchema.validateAsync({
      title,
      username,
    });
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};

const deleteMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      id: id.required(),
    });
    const value = await movieSchema.validateAsync({
      id: req.params.id,
    });
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};

module.exports = {
  createMovieValidator,
  updateMovieValidator,
  getMovieValidator,
  deleteMovieValidator,
};
