export default function PhotoList({ $target, initialState = [] }) {
  const $photoList = document.createElement("ul");
  $photoList.classList.add("photos");
  $target.appendChild($photoList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };
  this.render = () => {
    $photoList.innerHTML = `
      ${this.state
        .map(
          (photo) => `
        <li class="photos__photo">
          <img width="100%" src="${photo.imagePath}" alt="냥이 사진" />
        </li>
      `
        )
        .join("")}
    `;
  };
}
