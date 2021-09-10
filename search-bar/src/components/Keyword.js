import names from "@/utils/classNames";

export default function Keyword({
  $target,
  initialState,
  onKeywordInput,
  onEnter,
}) {
  const { _keyword } = names;
  const $keyword = document.createElement("input");
  $keyword.classList.add(_keyword);

  $target.appendChild($keyword);

  this.state = initialState;
  this.setState = (nextState) => {
    console.log("inKeyword: ", this.state, nextState);
    this.state = nextState;
    $keyword.value = this.state.value;
  };

  $keyword.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    } else {
      onKeywordInput(e.target.value);
    }
  });
}
