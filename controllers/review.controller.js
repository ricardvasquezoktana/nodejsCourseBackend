const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const Movie = mongoose.model("Movie");

module.exports.findAll = async (req, res, next) => {
    try{
        const movieId = req.query.movieId;
        const reviews = await Review.find({ movieId: movieId}).exec();

        res.status(200).json(reviews);
    }catch(error){
        res.sendStatus(500);
    }
};
module.exports.create = async (req, res, next) => {
    try{
        const movieId = req.query.movieId;
        const movie = await Movie.findById(movieId).exec();
        if (movie === null) {
            res.status(400).json({ error: 'Movie does not exist' })
            return
        }

        await new Review({
            movieId: movieId,
            reviewer: req.body.reviewer,
            rating: req.body.rating,
            review: req.body.review,
          }).save();

        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
};
// module.exports.findAll = (req, res, next) => {};
// module.exports.findAll = (req, res, next) => {};
// module.exports.findAll = (req, res, next) => {};
