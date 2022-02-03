const Joi = require("joi");
const mongoose = require("mongoose");

const title = Joi.string().min(5);
const username = Joi.string().min(5);
const id = Joi.string().alphanum().length(24);

const createMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      title: title.required(),
      username: username.required(),
    });
    const value = await movieSchema.validateAsync(
      {
        title: req.body.title,
        username: req.body.username,
      },
      { abortEarly: false }
    );

    next();
  } catch (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(400).json({ errors });
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
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      throw new Error("Id is not valid");
    }
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const updateMovieValidator = async (req, res, next) => {
  try {
    const movieSchema = Joi.object({
      title,
      username,
    });
    const value = await movieSchema.validateAsync(
      {
        title: req.body.title,
        username: req.body.username,
      },
      { abortEarly: false }
    );
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      throw new Error("Id is not valid");
    }
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({ errors });
    } else {
      res.status(400).json({ error: error.message });
    }
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
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      throw new Error("Id is not valid");
    }
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createMovieValidator,
  updateMovieValidator,
  getMovieValidator,
  deleteMovieValidator,
};
