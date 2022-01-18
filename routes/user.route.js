const user = require('../controllers/user.controller');

module.exports = app => {
  app.post('/user/register', user.register);
  app.get('/user/login', user.login);
}