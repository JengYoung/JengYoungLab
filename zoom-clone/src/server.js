import express from 'express'
import http from 'http';
import SocketIO from 'socket.io'

const app = express();

app.set("view engine", "pug");
app.set('views', __dirname + "/views")
app.use("/public", express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("home")
});

/**
 * express는 socket을 지원하지 않음.
 */
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer)

const sockets = [];

wsServer.on('connection', socket => {
  socket.onAny((e) => {
    console.log(`Socket Event: ${e}`)
  })

  socket.on('room:enter', (roomName, done) => { 
    socket.join(roomName)
    done();

    socket.to(roomName).emit("room:welcome");  
  })

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('room:bye'); 
    })
  })

  socket.on('room:message', ({msg, roomName}, done) => {
    socket.to(roomName).emit("room:message", msg);
    done();
  })
})

const handleListen = () => console.log("3000 listening...")
httpServer.listen(3000, handleListen)