require('dotenv').config();
const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
