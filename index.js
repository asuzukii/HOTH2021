const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// const router = require("./routes.js");

const app = express();

// if (process.env.NODE_ENV !== "production") app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'))

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.");
});