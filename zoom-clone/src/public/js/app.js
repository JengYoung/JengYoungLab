const $ = (name, target = document) => {
  return target.querySelector(name);
}

const socket = io();

const welcome = $('#welcome');
const form = $('form', welcome);
const room = $('#room')

room.hidden = true;


const setRoomHeader = ({ roomName, count }) => {
  const h3 = $('h3', room)
  h3.textContent = `🚪 ${roomName} (${count}명)`
}
/**
 * INFO: 방
 */
function showRoom({ roomName, count }) {
  welcome.hidden = true;
  room.hidden = false;

  setRoomHeader({ roomName, count })

  const msgForm = $('#msg', room);
  msgForm.addEventListener('submit', (e) => handleMessageSubmit(e, { roomName }))
}

/**
 * INFO: submit 이벤트
 */
function handleMessageSubmit(e, { roomName }) {
  e.preventDefault();

  const input = $('#msg input', room);
  const value = input.value;

  socket.emit('room:message', { msg: input.value, roomName }, addMessage);

  input.value = "";
}

function handleNicknameSubmit(e) {
  e.preventDefault()

  const nicknameInput = $('#nickname input', room)
  const value = nicknameInput.value;

  socket.emit('room:nickname', value);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const roomInput = $('#room-input');
  const nicknameInput = $('#nickname-input')
  
  const roomName = roomInput.value;
  const nickname = nicknameInput.value;

  const data = { roomName, nickname }

  socket.emit('room:nickname', nickname);
  socket.emit("room:enter", data, ({ count }) => showRoom({ roomName, count }))

  roomInput.value = "";
  nicknameInput.value = "";
}



/**
 * INFO: 메시지
 */
function addMessage({ nickname, msg }) {

  const ul = room.querySelector("ul");
  const li = document.createElement('li');
  
  li.textContent = `🙆🏻 ${nickname}: ${msg}`;
  ul.appendChild(li)
}

function addBroadcastMessage({ msg }) {
  const ul = room.querySelector("ul");
  const li = document.createElement('li');
  
  li.textContent = `📢 [알림] ${msg}`;
  ul.appendChild(li)
}


form.addEventListener('submit', handleFormSubmit)

socket.on("room:welcome", ({ nickname, roomName, count }) => {
  setRoomHeader({ roomName, count })

  addBroadcastMessage({msg: `🎉 ${nickname}님이 입장하셨어요!`})
})

socket.on('room:bye', ({ nickname, roomName, count }) => {
  setRoomHeader({ roomName, count })

  addBroadcastMessage({msg: `👋🏻 ${nickname}님이 방을 나가셨어요!`})
})

socket.on('room:message', addMessage);

socket.on('room:change', ({ rooms }) => {
  const roomList = $('ul', welcome);

  if (!rooms.length) {
    roomList.innerHTML = "";
    return;
  }

  const documentFragment = new DocumentFragment();

  rooms.forEach(room => {
    const li = document.createElement('li');
    li.textContent = room;

    documentFragment.appendChild(li);
  })

  roomList.appendChild(documentFragment);
});