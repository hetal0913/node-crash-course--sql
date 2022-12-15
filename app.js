const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const error = require("./middleware/error");
const {sendJson} = require('./middleware/generateResponse');
const params = require('strong-params');
const crypto = require('crypto');

//express app
const app = express();

//middleware and static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(params.expressMiddleware())

// const db = require("./models");
// db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};
//send json response
app.response.sendJson = sendJson
global.crypto = crypto;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//All routes
app.use("/api/v1", require('./routes/index.routes'));
// if error is not instance of APIError, convert it
app.use(error.converter)
// catch 404
app.use(error.notFound)
