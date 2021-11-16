import { io as socket } from "socket.io";

const msgForm = document.querySelector("#msgForm");
socket.on("userCount", (count) => {
  const userCounter = document.querySelector("#userCount");
  userCounter.textContent = `현재 ${count}명이 서버에 접속 중...`;
});

socket.on("message", (msg) => {
  const messageList = document.querySelector("#messages");
  const messageTag = document.createElement("li");
  messageTag.innerText = msg;
  messageList.appendChild(messageTag);
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msgInput = document.querySelector("#msgInput");

  socket.emit("message", msgInput.value);

  msgInput.value = "";
});
