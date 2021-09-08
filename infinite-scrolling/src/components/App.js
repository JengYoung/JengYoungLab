import PhotoList from "@/components/PhotoList";
import { request } from "@/apis/request";

export default function App({ $target }) {
  console.log($target);
  const $h1 = document.createElement("h1");
  $h1.textContent = "울 냥이덜... 집사가 oH77ㅕ...⭐";
  $h1.style.textAlign = "center";
  $target.appendChild($h1);

  this.state = {
    limit: 5,
    start: 0,
    photos: [],
  };
  const photoList = new PhotoList({
    $target,
    initialState: this.state.photos,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    photoList.setState(nextState.photos);
  };

  const fetchPhotos = async () => {
    const photos = await request(`/cat-photos?_limit=5&_start=0`);
    this.setState({
      ...this.state,
      photos,
    });
  };

  fetchPhotos();
}
