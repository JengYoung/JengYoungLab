import names from "@/utils/classNames";

export default function Keyword({ $target, onKeywordInput }) {
  const { _keyword } = names;
  const $keyword = document.createElement("input");
  $keyword.classList.add(_keyword);

  $target.appendChild($keyword);

  $keyword.addEventListener("keyup", (e) => {
    onKeywordInput(e.target.value);
  });
}
