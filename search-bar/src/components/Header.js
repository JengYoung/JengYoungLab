import names from "@/utils/classNames";
import Keyword from "@/components/Keyword";

export default function Header({
  $target,
  initialState,
  onKeywordInput,
  onEnter,
}) {
  const { _header } = names;
  const $header = document.createElement("header");
  $header.classList.add(_header);
  $target.appendChild($header);

  const $title = document.createElement("h1");
  $title.textContent = "🐈고양이 사진 검색기🔍";
  $header.appendChild($title);

  const keyword = new Keyword({
    $target: $header,
    initialState: {
      value: "",
    },
    onKeywordInput,
    onEnter,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    console.log("inHeader", this.state.keyword, nextState.keyword);
    if (this.state.keyword !== nextState.keyword) {
      this.state = nextState;
      keyword.setState({
        value: this.state.keyword,
      });
    }
  };
}
