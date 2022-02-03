const Joi = require('joi');

const userSchema = Joi.object({
  firstname: Joi.string()
    .alphanum(),
  lastname: Joi.string()
    .alphanum(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  repeatPassword: Joi.ref('password'),
})
  .with('password', 'repeatPassword');

module.exports = async (req, res, next) => {
  try {
    const value = await userSchema.validateAsync(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
      },
      { abortEarly: false }
    );
    next();
  }
  catch (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(400).json({ errors });
  }
};