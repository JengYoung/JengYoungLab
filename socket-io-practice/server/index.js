const { io } = require("socket.io");

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs"); // html rendering -> ejs
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index"); // index.ejs rendering
});

io.on("connection", (socket) => {
  socket.emit("userCount", io.engine.clientsCount);

  socket.on("message", (msg) => {
    console.log("Message received" + msg);

    io.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("Listening to 3000...");
});
