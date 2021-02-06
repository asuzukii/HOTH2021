const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const ss = require('socket.io-stream');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("makeMeme", (data) => {
    console.log("requesting to make meme!!!");
    console.log(data);
    // TODO: pass arguments to python script
    // makeMeme(); Skipping this step, but test later that python works
    // Transfer video file to user.
    
  });

  // ss(socket).on('profile-image', function(stream, data) {
  //     var filename = path.basename(data.name);
  //     stream.pipe(fs.createWriteStream(filename));
  //   });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("static"))

http.listen(3000, () => {
  console.log("Server started");
});

// TODO put arguments and stuffs (passed in from frontend)
function makeMeme() {
  const spawn = require("child_process").spawn; 
  console.log("Running python");
  const process = spawn("python", ["./randomtesting/tracking.py"]); 
  
  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on("data", function(data) { 
      console.log(data.toString());
  }); 
}
