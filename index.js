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
    console.log("Making meme");
    console.log(data);
    // TODO: pass arguments to python script
    // makeMeme(); Skipping this step, but test later that python works
    // Transfer video file to user.
    socket.emit("getVideo", "vid");
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("static"));

app.get("/vid", function(req, res) {
  console.log("requesting video");
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./randomtesting/strike.mp4";
  const videoSize = fs.statSync("./randomtesting/strike.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

// app.post('/makeMeme', function (req, res) {
//   // fs.readFile("./randomtesting/strike.mp4", function(err, data) {
//   //   if (err)
//   //     console.log("bruh", error);
//   //   res.send(data);
//   // });
//   fs.createReadStream("./randomtesting/strike.mp4").pipe(res);
// })

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
