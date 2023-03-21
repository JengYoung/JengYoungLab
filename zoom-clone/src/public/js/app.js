const $ = (name, target = document) => {
  return target.querySelector(name);
}

const socket = io();

const welcome = $('#welcome');
const form = $('form', welcome);
const room = $('#room');

room.hidden = true;

let myPeerConnection;

const setRoomHeader = ({ roomName, count }) => {
  const h3 = $('h3', room)
  h3.textContent = `🚪 ${roomName} (${count}명)`
}

async function createMyStream() {
  const myVideoWrapper = document.createElement('article');
  myVideoWrapper.id = 'my-video-wrapper';

  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;
  video.width = "400";
  video.height = "400";
  video.id = 'my-face';

  const muteButton = document.createElement('button');
  muteButton.id = 'mute-btn';
  muteButton.textContent = '음소거'

  const cameraButton = document.createElement('button');
  cameraButton.id = 'camera-btn';
  cameraButton.textContent = '카메라 끄기'

  const cameraSelect = document.createElement('select');
  cameraSelect.id = 'cameras-select';

  myVideoWrapper.appendChild(video);
  myVideoWrapper.appendChild(muteButton);
  myVideoWrapper.appendChild(cameraButton);
  myVideoWrapper.appendChild(cameraSelect);

  room.insertBefore(myVideoWrapper, room.firstChild)

  const myStream = await afterCreateMyStream();
  return myStream;
}

async function createPeersStream(myStream) {
  const peerVideoWrapper = document.createElement('article');
  peerVideoWrapper.id = 'peer-video-wrapper';

  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;
  video.width = "400";
  video.height = "400";
  video.id = 'peer-face';
  
  peerVideoWrapper.appendChild(video)
  room.insertBefore(peerVideoWrapper, $('h3', room));
}

/**
 * INFO: 방
 */
async function showRoom({ roomName }) {
  welcome.hidden = true;
  room.hidden = false;
  
  const myStream = await createMyStream();
  await createPeersStream(myStream);
  await makeRTCConnection(myStream, roomName);

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

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const roomInput = $('#room-input');
  const nicknameInput = $('#nickname-input')
  
  const roomName = roomInput.value;
  const nickname = nicknameInput.value;

  const data = { roomName, nickname }
  await showRoom({ roomName })

  socket.emit('room:nickname', nickname);
  socket.emit("room:enter", data, ({ count }) => setRoomHeader({ roomName, count }))

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

/**
 * 사실상 addStream의 역할을 함.
 * track들을 개별적으로 추가시켜주는 함수.
 */
function makeRTCConnection(myStream, roomName) {
  myPeerConnection = new RTCPeerConnection();
  
  myPeerConnection.addEventListener('icecandidate', (data) => handleIce(data, roomName));
  myPeerConnection.addEventListener('track', handleAddStream);
  
  myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream))
}

function handleIce(data, roomName) {
  console.log('😎got ICE Candidate', data.candidate);

  socket.emit("webrtc:client:ice", { ice: data.candidate, roomName })

  console.log('🧊 sent ICE', data.candidate)
}

function handleAddStream(data) {
  console.log("🙆🏻 got stream by peer!")

  const peerFace = $('#peer-face');
  peerFace.srcObject = data.streams[0];
}


socket.on("room:welcome", async ({ nickname, roomName, count }) => {
  const offer = await myPeerConnection.createOffer();

  myPeerConnection.setLocalDescription(offer);

  /* 상대방이 들어오면, 나의 정보를 전달해준다. */
  socket.emit("webrtc:sender:offer", { offer, roomName });

  console.log('🥰 sent the offer')
  
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


/* 들어오면 방에 있던 유저가 들아온 사람에게 offer을 제공해줄 거고, 들어온 사람은 정보를 받는다. */
socket.on("webrtc:server:offer", async ({ offer, roomName }) => {
  console.log('🙆🏻‍♀️ received offer')
  /**
   * NOTE: 내가 들어오면서 커넥션을 준비하는 동안 이미 상대방의 메시지는 도착하게 될 것.
   * 
   */
  myPeerConnection.setRemoteDescription(offer);

  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);

  console.log('💌 sent answer');

  socket.emit("webrtc:receiver:answer", { answer, roomName });
})

socket.on('webrtc:server:answer', ({ answer }) => {
  console.log('💌 received answer');

  myPeerConnection.setRemoteDescription(answer);
})

socket.on("webrtc:server:ice", ({ ice }) => {
  console.log('🧊 received ICE', ice)

  myPeerConnection.addIceCandidate(ice)
})