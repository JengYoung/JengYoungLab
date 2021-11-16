const express = require("express");
const socket = require("socket.io");

const http = require("http");

// 클라이언트에서 볼 수 있도록 함.
const fs = require("fs");

const app = express();

const server = http.createServer(app);

const io = socket(server);

/*
  정적파일을 제공하기 위해 미들웨어 사용
  app.use() 사용 -> 미들웨어 추가 및 조합
*/

app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));
app.get("/", (req, res) => {
  fs.readFile("./static/index.html", (err, data) => {
    if (err) {
      res.send("Error Occured!");
    } else {
      // 헤더에 해당 내용을 작성하여 보내줌.
      res.writeHead(200, { "Content-Type": "text/html" });
      // HMTL 데이터를 보내줌.
      res.write(data);
      // 완료
      res.end();
    }
  });
});

// connection이라는 이벤트 발생 시 -> 콜백 함수 실행.
/*
  io.sockets: 접속되는 모든 소켓
  callback 함수로 전달되는 내부 소켓: 접속된 해당 소켓.
*/
io.sockets.on("connection", (socket) => {
  console.log("User Logined!");

  /*
    각 소켓들에게도 세부적으로 이벤트를 정의할 수 있다.
  */
  socket.on("message", ({ message }) => {
    console.log("Message: ", message);
  });

  socket.on("disconnect", () => {
    console.log("User Logout!");
  });
});

server.listen(8080, function () {
  console.log("Listening to 8080...");
});
