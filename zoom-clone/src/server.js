import express from 'express'
import http from 'http';
import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';

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
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  }
})

instrument(wsServer, {
  auth: false
})

function getPublicRooms() {
  const { sids, rooms } = wsServer.sockets.adapter;
  const publicRooms = [];

  rooms.forEach((_, key) => {
    if (!sids.has(key)) publicRooms.push(key);
  })

  return publicRooms;
}

function getRoomCount(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName).size;
}

/**
 * NOTE:
 * io.sockets.emit: 연결된 모든 Socket들에게 응답해주는 것.
 */
wsServer.on('connection', socket => {
  // wsServer.socketsJoin("notice")

  socket["nickname"]="익명의 유저"
  socket.onAny((e) => {
    console.log(`Socket Event: ${e}`)
  })

  socket.on('room:enter', ({ roomName, nickname }, done) => { 
    socket.join(roomName)

    const count = getRoomCount(roomName);

    socket.to(roomName).emit("room:welcome", { nickname, roomName, count });  
    wsServer.sockets.emit('room:change', { rooms: getPublicRooms() })
    
    done({ count });
  })

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      // 아직 방을 나가기 직전이므로 -1을 제해주어야 한다.
      socket.to(room).emit('room:bye', { nickname: socket["nickname"], roomName: room, count: getRoomCount(room) - 1 });
    })
  })

  socket.on('disconnect', () => {
    wsServer.sockets.emit('room:change', { rooms: getPublicRooms() })
  })

  socket.on('room:message', ({msg, roomName}, done) => {
    const data = { nickname: socket["nickname"], msg };

    socket.to(roomName).emit("room:message", data);
    done({ nickname: socket["nickname"], msg });
  })

  socket.on('room:nickname', (nickname) => {
    socket["nickname"] = nickname;
  })
}) 

const handleListen = () => console.log("3000 listening...")
httpServer.listen(3000, handleListen)