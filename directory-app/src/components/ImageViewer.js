import names from "@/utils/classNames";

export default function ImageViewer({ $target, onClose }) {
  const { _imageViewer, _modal } = names;
  const $imageViewer = document.createElement("div");
  $imageViewer.classList.add(_imageViewer, _modal);
  $target.appendChild($imageViewer);

  this.state = {
    selectedImageUrl: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $imageViewer.style.display = this.state.selectedImageUrl ? "block" : "none";
    $imageViewer.innerHTML = `
      <div className="content">
        <img src="${this.state.selectedImageUrl}" alt="" />
      </div>
    `;
  };
  this.render();

  window.addEventListener("keyup", (e) => {
    // key === esc => call onClose
    if (e.key === "Escape") {
      onClose();
    }
  });

  $imageViewer.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains(_modal)) {
      onClose();
    }
  });
}
