const express = require("express");
const router = express.Router();
const review = require("../controllers/review.controller");

router.get("/findAll", review.findAll);
router.post("/create", review.create);

//next version
// router.get("/:id", review.findOne);
// router.patch("/:id", review.update);
// router.delete("/:id", review.delete);

module.exports = router;
