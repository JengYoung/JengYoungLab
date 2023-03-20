const $ = (name, target = document) => {
  return target.querySelector(name);
}

const messageList = $('ul');
const nicknameForm = $('#nickname');
const messageForm = $('#message');

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload }
  return JSON.stringify(msg)
}

socket.addEventListener('open', () => {
  console.log("🎉 Connected to Server.")
})

socket.addEventListener('message', message => {
  console.log("💬 New message: ", message.data)
  const li = document.createElement('li');
  li.textContent = message.data;
  messageList.append(li)
})

socket.addEventListener('close', () => {
  console.log("❌ Disconnected!")
})

function handleSubmit (e) {
  e.preventDefault();

  const input = $('input', messageForm);
  
  socket.send(makeMessage('message', input.value))
  
  input.value ="";
}

function handleNicknameSubmit(e) {
  e.preventDefault()

  const input = $('input', nicknameForm);

  socket.send(makeMessage('nickname', input.value));

  input.value ="";
}

messageForm.addEventListener('submit', handleSubmit)
nicknameForm.addEventListener('submit', handleNicknameSubmit)