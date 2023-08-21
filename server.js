const express = require("express");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Static Assets
app.use(express.static(path.join(__dirname, "public")));

// Socket
io.on("connection", (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit("chat message", msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => console.log(`⚡️ [server]: Server Listening at: http://localhost:${PORT}`));