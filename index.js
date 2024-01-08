const express = require("express");
const app = express();
const http = require("http");
// const path = require("path");
const { Server } = require("socket.io");
const PORT = 6060;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("socket io conected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log("server running on 6060");
});
