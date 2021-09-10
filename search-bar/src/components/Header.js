import names from "@/utils/classNames";
import Keyword from "@/components/Keyword";

export default function Header({ $target, onKeywordInput }) {
  const { _header } = names;
  const $header = document.createElement("header");
  $header.classList.add(_header);

  $target.appendChild($header);

  const $title = document.createElement("h1");
  $title.textContent = "🐈고양이 사진 검색기🔍";
  $header.appendChild($title);

  const keyword = new Keyword({ $target: $header, onKeywordInput });
}
