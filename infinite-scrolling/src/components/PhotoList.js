import names from "@/utils/classNames";

export default function PhotoList({
  $target,
  initialState = [],
  onScrollEnded,
}) {
  let isInit = false;
  const {
    photoList,
    photos: photosClassName,
    photo: photoClassName,
    photoLoadMore,
  } = names;

  const $photoList = document.createElement("div");
  $photoList.classList.add(photoList);
  $target.appendChild($photoList);
  this.state = initialState;

  /**
   * @param {function} callback
   * @param {object} option
   * @description object keys
   *              root: 감시할 대상의 상위 요소 (default: viewport)
   *              rootmargin: 얼마나 마진을 둘 건지
   *              threshold: 얼마나 지났을 경우에
   */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { isLoading, totalCnt, photos } = this.state;
        if (entry.isIntersecting && !isLoading && photos.length < totalCnt) {
          onScrollEnded();
        }
      });
    },
    {
      threshold: 0.8,
    }
  );
  let $lastLi = null;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };
  this.render = () => {
    if (!isInit) {
      $photoList.innerHTML = `
        <ul class="${photosClassName}">
        </ul>
        <button class="${photoLoadMore}">Load More</button>
      `;
      isInit = true;
    }

    const { isLoading, photos } = this.state;
    const $photos = $photoList.querySelector(`.${photosClassName}`);
    photos.forEach((photo) => {
      // phooto의 id 기준으로 렌더링 되어 있는지 체크하고
      if (
        $photos.querySelector(`li[data-id="${photo.id}"]`) === null &&
        !isLoading
      ) {
        // 없으면 li 생성하고 $photos에 appendChild
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.classList.add(`${photoClassName}`);
        $li.innerHTML = `<img src="${photo.imagePath}" alt="ul 냥ol dir Ar진...⭐" />`;
        $photos.appendChild($li);
      }
    });
    const $nextLi = $photoList.querySelector("li:last-child");
    if ($nextLi !== null) {
      if ($lastLi !== null) {
        observer.unobserve($lastLi);
      }
      $lastLi = $nextLi;
      observer.observe($lastLi);
    }
  };

  this.render();

  // $photoList.addEventListener("click", (e) => {
  //   if (
  //     e.target.classList.contains("photos__load-more") &&
  //     !this.state.isLoading
  //   ) {
  //     onScrollEnded();
  //   }
  // });

  // window.addEventListener("scroll", () => {
  //   // 계속해서 마지막에 api를 불러오는 현상 발생
  //   // 1. 전체 갯수를 불러오는 api와 현재 데이터 개수를 비교하는 경우
  //   // 2. 5개보다 작은 경우 없다고 판단하는 경우 - 마지막 데이터가 5개인 경우 체크하기 힘듦
  //   const { isLoading, totalCnt, photos } = this.state;
  //   const { innerHeight, scrollY } = window;
  //   const isScrollEnded = innerHeight + scrollY >= document.body.offsetHeight;
  //   if (isScrollEnded && !isLoading && photos.length < totalCnt) {
  //     onScrollEnded();
  //   }
  // });
}
