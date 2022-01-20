const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const validateUser = require("../validators/users.validator");

router.get("/login", user.login);
router.post("/register", validateUser, user.register);

module.exports = router;
