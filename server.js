const express = require("express");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server);

let userCount = 0;
let gameArray = ["", "", "", "", "", "", "", "", ""];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Static Assets
app.use(express.static(path.join(__dirname, "public")));

// Socket
io.on("connection", (socket) => {
    userCount++

    if (userCount === 2) {
        socket.broadcast.emit("start", "X");
        socket.emit("start", "O");
    }

    socket.on("move", (index, letter) => {
        gameArray[index] = letter;
        socket.broadcast.emit("update", index, letter);
    });
});

server.listen(PORT, () => console.log(`⚡️ [server]: Server Listening at: http://localhost:${PORT}`));