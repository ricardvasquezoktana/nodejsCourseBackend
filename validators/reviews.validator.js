const Joi = require('joi');
const mongoose = require("mongoose");

const reviewSchema = Joi.object({
  movieId: Joi.string()
    .alphanum()
    .required(),
  reviewer: Joi.string()
    .required(),
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  review: Joi.string()
    .required()
    .max(250),
})

module.exports = async (req, res, next) => {
  try {
    // Checking if movieId is valid before using findById, otherwise this method will return error.
    const isValid = mongoose.Types.ObjectId.isValid(req.query.movieId);
    if(!isValid) throw new Error("MovieID is not valid");
    const value = await reviewSchema.validateAsync({
      movieId: req.query.movieId,
      reviewer: req.body.reviewer,
      rating: req.body.rating,
      review: req.body.review,
    });
    next();
  }
  catch (error) {
    if(error instanceof Joi.ValidationError){
      res.status(400).json({ error: error.details[0].message });
    }else{
      res.status(400).json({ error: error.message });
    }
  }
};