const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors()); // Enable CORS for all routes

io.on('connection', socket => {
    socket.broadcast.emit("A user connected server-side")

    socket.on('send-message', (msg) => {
        //console.log('Message on server')
        socket.broadcast.emit('receive-message', msg)
    })
  })

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  //console.log(`Server listening on port ${PORT}`);
});