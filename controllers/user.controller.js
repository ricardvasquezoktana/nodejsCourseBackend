const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validateHash = function (password, user) {
  return bcrypt.compareSync(password, user.password);
};

module.exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();
    if (user != null) {
      res.status(400).json({ error: 'User already exists' })
      return
    }

    const _ = await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: generateHash(req.body.password),
    }).save();

    res.sendStatus(201);
  }
  catch (error) {
    res.sendStatus(500)
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (user == null) {
      res.status(400).json({ error: 'User not found' });
    } else if (!validateHash(req.body.password, user)) {
      res.status(403).json({ error: 'User or password incorrect' });
    } else {
      res.status(200).json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      });
    }
  }
  catch (error) {
    res.sendStatus(500);
  }
}
