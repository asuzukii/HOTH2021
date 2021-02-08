const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// like a list here

io.on("connection", (socket) => {
  socket.on("makeMeme", (data) => {
    console.log(data);
    // TODO: pass arguments to python script
      // makeMeme();
    let fileName = String(Math.floor(Math.random() * 100000000));
    console.log(data.text);
    makeMeme(data.currVideo, data.text, fileName);
  });
  socket.on("getUrls", () => {
    fs.readdir("./memetemplates/output", (err, files) => {
      let urls = [];
      files.forEach(file => {
        urls.push(file.split(".")[0]);
      });
      socket.emit("sendUrls", urls);
    });
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("static"));

app.get("/download/:vidFile", function(req, res) {
  res.download(`./memetemplates/output/${req.params.vidFile}.mp4`);
});

app.get("/vid/:vidFile", function(req, res) {
  console.log(req.params);
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  // get video stats (about 61MB)
  const videoPath = `./memetemplates/output/${req.params.vidFile}.mp4`;
  const videoSize = fs.statSync(videoPath).size;

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

http.listen(3000, () => {
  console.log("Server started");
});

// TODO put arguments and stuffs (passed in from frontend)
function makeMeme(vidtemplate, text, filename) {
  const spawn = require("child_process").spawn; 
  // input text needed here as well
  console.log("Running python");
  console.log(vidtemplate, text[0], text[1], text[2], filename);
  const child = vidtemplate === "panda" ? spawn("python3", [`./memetemplates/${vidtemplate}/create.py`, text[0], text[1], text[2], text[3], filename]) : 
  spawn("python3", [`./memetemplates/${vidtemplate}/create.py`, text[0], text[1], text[2], filename]); 
  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  child.stdout.on("data", function(data) { 
    console.log(data.toString());
    io.sockets.emit("getVideo", filename);
  }); 
}
