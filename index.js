const express = require('express');
const routerApi = require('./routes');
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
app.use(express.json());
const port = 3000;

routerApi(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log('connected on: ' + port));
