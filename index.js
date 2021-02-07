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
    console.log("Making meme");
    console.log(data);
    // TODO: pass arguments to python script
      // makeMeme();
    let fileName = String(Math.floor(Math.random() * 100000000));
    /*Chat lol */
    // lemme actually try this out
    // yeah, that would probably necessary if live update doesn't work out cause with live update they can see the lines i guess actually wait
    // we'd have to automatically break the string into diff lines
    // but they can see where the breaks are
    // hmm, yeah this could be in front end acutally (the switch)
    // we could do a textarea and force the lines somehow (i dunno exactly how that would work)
    // is filename generating random names for the vid outputs
    // yup the filename is rand for yup it doesn't work yet, sortof breaking the code to implement it now  cool
    // we got it to show video on the front end, but i'm just fixing it so we can use a variable url for diff videos yeet
    makeMeme(data.currVideo, data.text, fileName);
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
  // just for now, delete this later
  vidtemplate = "dodge";
  text[1] = "bruh";
  text[2] = "why";
  console.log(text[0], text[1], text[2], vidtemplate, filename);
  // DELETE ABOVE LATER
  const process = spawn("python3", [`./memetemplates/${vidtemplate}/create.py`, text[0], text[1], text[2], filename]); 
  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on("data", function(data) { 
    console.log(data.toString());
    io.sockets.emit("getVideo", filename);
  }); 
}
