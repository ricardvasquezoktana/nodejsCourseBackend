const Joi = require('joi');

const reviewSchema = Joi.object({
  movieId: Joi.string()
    .alphanum()
    .required(),
  reviewer: Joi.string()
    .alphanum()
    .required(),
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  review: Joi.string()
    .required()
    .max(50),
})

module.exports = async (req, res, next) => {
  try {
    const value = await reviewSchema.validateAsync({
      movieId: req.query.movieId,
      reviewer: req.body.reviewer,
      rating: req.body.rating,
      review: req.body.review,
    });
    next();
  }
  catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};