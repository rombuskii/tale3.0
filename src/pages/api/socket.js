import { Server} from "socket.io";


const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      socket.broadcast.emit("A user connected server-side")
      socket.on('send-message', (msg) => {
          console.log('Message on server')
          socket.broadcast.emit('receive-message', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler