// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { mongoURI } = require("./config/keys");

// Models
require("./models/User.model");
require("./models/Review.model");

// Routes
const routerApi = require("./routes/index.route");

// Server and DB Settings
const PORT = process.env.PORT;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true });
const app = express();
app.use(express.json());

// Server Routes
routerApi(app);

// Start Server
app.listen(PORT, () => console.log(`Listening on port`, PORT));
