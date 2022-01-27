const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema({
  movieId: Number,
  reviewer: String,
  rating: Number,
  review: String
})

mongoose.model('Review', reviewSchema)
