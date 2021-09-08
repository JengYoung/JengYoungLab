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
    nextStart: 0,
    photos: [],
    totalCnt: 0,
    isLoading: false,
  };

  const photoList = new PhotoList({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
    },
    onScrollEnded: async () => {
      await fetchPhotos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    photoList.setState({
      isLoading: this.state.isLoading,
      photos: nextState.photos,
      totalCnt: this.state.totalCnt,
    });
  };

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const { limit, nextStart } = this.state;

    const photos = await request(
      `/cat-photos?_limit=${limit}&_start=${nextStart}`
    );
    this.setState({
      ...this.state,
      nextStart: nextStart + limit,
      photos: [...this.state.photos, ...photos],
      isLoading: false,
    });
  };

  const initialize = async () => {
    const totalCnt = await request("/cat-photos/count");

    this.setState({
      ...this.state,
      totalCnt,
    });

    await fetchPhotos();
  };

  initialize();
}
