const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  username: String,
  rating: Number,
  review: String,
});

mongoose.model("Movie", movieSchema);
