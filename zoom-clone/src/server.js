import express from 'express'
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set("view engine", "pug");
app.set('views', __dirname + "/views")
app.use("/public", express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("home")
})

// app.listen(3000, () => {
//   console.log("3000 listening...")
// });

/**
 * express는 socket을 지원하지 않음.
 */
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

// socket: 연결된 상대방
function handleConnection(socket) {
  socket.nickname = '익명';
  
  sockets.push(socket)
  console.log("📢 Socket Connected!");

  socket.on("close", () => {
    console,log("❌ Socket Disconnected!")
  })

  socket.on("message", (message) => {
    const messageUTF8 = JSON.parse(message.toString("utf8"));

    switch(messageUTF8.type) {
      case 'message': {
        sockets.forEach(eachSocket => {
          eachSocket.send(`${eachSocket.nickname}: ${messageUTF8.payload}`)
        })
        return;
      }

      case 'nickname': {
        console.log(messageUTF8.payload)
        socket['nickname'] = messageUTF8.payload;
        return;
      }

      default: {
        return;
      }
    }
  })
}

wss.on("connection", handleConnection)

server.listen(3000, () => {
  console.log("3000 listening...")
})