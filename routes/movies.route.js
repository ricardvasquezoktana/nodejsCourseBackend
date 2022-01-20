const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie.controller");

router.get("/", movie.findAll);
router.post("/", movie.create);
router.get("/:id", movie.findOne);
router.patch("/:id", movie.update);
router.delete("/:id", movie.delete);

module.exports = router;
