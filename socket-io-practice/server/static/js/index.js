const socket = io();

socket.on("connect", () => {
  const name = prompt("Hello :)", "");
  if (!name) name = "anonymous user";

  socket.emit("newUser", name);
});

socket.on("update", (data) => {
  console.log(`${data.name}: ${data.message}`);
});

const send = () => {
  const $test = document.querySelector("#test");
  const message = $test.value;

  /*
    on: 수신
    emit: 전송
    따라서 emit을 통해 서버에 `message`라는 이벤트를 전달
  */
  socket.emit("message", { type: "message", message });
  $test.value = "";
};
