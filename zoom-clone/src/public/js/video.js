// const $ = (name, target = document) => {
//   return target.querySelector(name);
// }

/**
 * @todo
 * [x] 1. 비디오를 유저로부터 가져와야 함.
 * [x] 2. 비디오에 대한 효과를 조절할 버튼을 만들어야 함. (마이크, 카메라 제어)
 * [x] 3. 유저들의 카메라 목록과 정보를 가져와야 함. (enumerateDevices, getUserMedia)
 * [x] 4. 화면에서 선택 가능하도록 컴포넌트 추가하기.
 * [x] 5. 디바이스 선택 컴포넌트 이벤트 달기.
 * 
 * [x] 6. WebRTC (Peer to Peer, Signaling - 상대방과 연결시키기 위해 상대방 상태를 알려주는 서버이지, 오디오, 비디오는 전적으로 Peer to Peer로 처리.)
 * 
 * 6-1. getUserMedia()
 * 6-2. addStream
 * 6-3. createOffer
 * 6-4. setLocalDescription
 * 
 * 이후 클라이언트는 send offer
 * 
 * signaling server은 이를 상대방 브라우저(클라이언트)에 보내준다.
 * 여기서 setRemoteDescription()
 * getuserMedia()
 * addStream()
 * createAnswer()
 * setLocalDescription()
 * 을 해주어, 서로간의 연결에 대한 상태를 제공한다.
 * 
 * 서버에서는 answer을 보내줌
 * 클라이언트는 setRemoteDescription();
 * 
 * [ ] 7. IceCandidate 이벤트
 * 이는 인터넷 연결 생성(Internet Connectivity Establishment)을 의미한다.
 * 브라우저가 소통할 수 있게 해주는 방식이며, 어떤 소통 방법이 좋을지 제안할 때 쓴다.
 *  
 * - 다수의 후보들은 각각의 연결에서 제안되고
 * - 서로의 동의하에 하나의 방법을 선택
 * - 이는 answer 등 다른 모든 것을 얻고 난 뒤 실행.
 * 
 * 이후 icecandidate 이벤트가 발생하면 send candidate
 * 서버에서는 다시 상대방에게 보내주고, 상대방은 addICECandidate()
 * 
 * 상대방 역시 iceCandidate 이벤트가 발생 시 서버에 전달
 * signaling server가 candidate를 응답하면 클라이언트에선 addICECandidate()
 */

async function afterCreateMyStream() {
  const myFace = $('#my-face');

  const muteButton = $('#mute-btn');
  const cameraButton = $('#camera-btn');
  
  /**
   * stream은 비디오와 오디오, 자막과 같은 "track"들을 제공한다.
   */
  let myStream;
  let muted = false;
  let cameraoff = false;
  
  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');

      const currentCamera = myStream.getVideoTracks()[0];

      cameras.forEach((camera) => {
        const option = document.createElement('option');
        option.value = camera.deviceId
        option.textContent = camera.label;

        const cameraSelect = $('#cameras-select');

        if (currentCamera.label === camera.label) {
          option.selected = true;
        }

        cameraSelect.appendChild(option);
      })
    } catch(e) {
      console.error(e)
    }
  }

  async function getMedia(data) {
    const deviceId = data?.deviceId;

    const initialConstraints = {
      video: {
        facingMode: 'user',
      },
      audio: true
    };

    const cameraConstraints = {
      audio: true,
      video: {
        deviceId: { 
          exact: deviceId 
        }
      }
    }

    try {
      /**
       * 요청된 미디어 유형을 포함하는 트랙을 생성하는 미디어 입력을 사용할 수 있는 권한을 사용자에게 요청
       */
      myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstraints);
  
      /**
       * 해당 스트림 데이터를 비디오 엘리먼트에 넣어준다.
       */
      myFace.srcObject = myStream;

      if (!deviceId) {
        await getCameras()
      }
    } catch(e) {
      console.error(e)
    }
  }
  
  await getMedia()
  
  function handleMuteButtonClick() {
    const audioTracks = myStream.getAudioTracks();
    audioTracks.forEach((track) => track.enabled = !track.enabled);
  
    if (!muted) {
      muteButton.textContent = '음소거 해제'
      muted = true;
    } else {
      muteButton.textContent = '음소거'
      muted = false;
    }
  }
  function handleCameraButtonClick() {
    const cameraTracks = myStream.getVideoTracks();
    cameraTracks.forEach((track) => track.enabled = !track.enabled);
    
    if (cameraoff) {
      cameraButton.textContent = '카메라 끄기',
      cameraoff = false;
    } else {
      cameraButton.textContent = '카메라 켜기',
      cameraoff = true;
    }
  }

  const camerasSelect = $('#cameras-select');
  async function handleCamerasSelectChange() {
    await getMedia({ deviceId: camerasSelect.value });
  }

  muteButton.addEventListener('click', handleMuteButtonClick);
  cameraButton.addEventListener('click', handleCameraButtonClick);
  
  camerasSelect.addEventListener('input', handleCamerasSelectChange);

  return myStream;
}

