const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  _id: String,
  title: String,
  username: String,
  rating: Number,
  review: String,
});

mongoose.model("Movie", movieSchema);