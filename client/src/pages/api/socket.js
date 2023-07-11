import { Server, Socket } from "socket.io";
// server is provided by expressJS or NextJS in this example
// ExpresssJS: const server = http.createServer(app);

// pseudocode for a REST API handler at `/api/socket`
const SocketHandler = (req, res) => {
    const server = req.socket.server;
  // if the WebSocket server is already running, do nothing
  if (server.io) {
    res.end();
    return; 
  }
  // Note that this variable represents the WebSocket server URL
  // which may or may not be the same as the REST API endpoint,
  // depending on your framework or organizational restrictions
  const socketRootUrl = "/api/socket";
  const io = new Server(server, { path: socketRootUrl });
  // connect events here
  io.on('connection', socket => {
    socket.broadcast.emit("A user connected server-side")
    socket.on('send-message', (msg) => {
        console.log('Message on server')
        socket.broadcast.emit('receive-message', msg)
    })
  })
  // store the WebSocket server somewhere
  server.io = io;
  res.end();
}

export default SocketHandler