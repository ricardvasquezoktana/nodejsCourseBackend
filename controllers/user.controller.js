const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validateHash = function (password, user) {
  return bcrypt.compareSync(password, user.password);
};

module.exports.register = (req, res, next) => {
  new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: generateHash(req.body.password),
  })
    .save()
    .then((_) => {
      res.sendStatus(201);
    })
    .catch((_) => {
      res.sendStatus(500);
    });
};

module.exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user == null) {
        res.sendStatus(400);
      } else if (!validateHash(req.body.password, user)) {
        res.sendStatus(403);
      } else {
        res.status(200).json({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      }
    })
    .catch((_) => {
      res.sendStatus(500);
    });
};
