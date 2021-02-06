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

makeMeme(); // temporarily placed here
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.");
  
});

// TODO put arguments and stuffs (passed in from frontend)
function makeMeme() {
  const spawn = require("child_process").spawn; 
  console.log("Running python");
  const process = spawn('python', ["./randomtesting/tracking.py"]); 
  
  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on('data', function(data) { 
      console.log(data.toString());
  }); 
}