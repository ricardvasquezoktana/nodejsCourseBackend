const express = require("express");
const router = express.Router();
const review = require("../controllers/review.controller");
const validaterReview = require("../validators/reviews.validator");

router.get("/findAll", review.findAll);
router.post("/create", validaterReview, review.create);

//next version
// router.get("/:id", review.findOne);
// router.patch("/:id", review.update);
// router.delete("/:id", review.delete);

module.exports = router;
