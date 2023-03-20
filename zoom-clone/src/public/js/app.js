const $ = (name, target = document) => {
  return target.querySelector(name);
}

const socket = io();

const welcome = $('#welcome');
const form = $('form', welcome);
const room = $('#room')

room.hidden = true;

function handleMessageSubmit(e, roomName) {
  e.preventDefault();

  const input = $('input', room);
  const value = input.value;

  socket.emit('room:message', { msg: input.value, roomName }, () => {
    addMessage(`You: ${value}`)
  });

  input.value = "";
}

function showRoom(roomName) {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = $('h3', room)
  h3.textContent = `🚪 ${roomName}`

  const form = $('form', room);
  form.addEventListener('submit', (e) => handleMessageSubmit(e, roomName))
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement('li');

  li.textContent = message;
  ul.appendChild(li)
}

function handleRoomSubmit(e) {
  e.preventDefault();
  
  const input = $('input', form);
  const value = input.value;

  socket.emit("room:enter", input.value, () => showRoom(value))

  input.value = "";
}

form.addEventListener('submit', handleRoomSubmit)

socket.on("room:welcome", () => {
  addMessage('🎉 Someone Joined!')
})

socket.on('room:bye', () => {
  addMessage('👋🏻 Someone Left!')
})

socket.on('room:message', addMessage)