import names from "@/utils/classNames";

export default function SuggestedKeywords({
  $target,
  initialState,
  onKeywordSelect,
}) {
  const { _keywords } = names;
  const $suggestedKeywords = document.createElement("div");
  $suggestedKeywords.classList.add(_keywords);
  $target.appendChild($suggestedKeywords);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { keywords, cursor } = this.state;

    $suggestedKeywords.innerHTML = `
      <ul>
        ${keywords
          .map(
            (keyword, i) => `
              <li class="${cursor === i ? "active" : ""}">${keyword}</li>
            `
          )
          .join("")}
      </ul>
    `;

    $suggestedKeywords.style.display = keywords.length > 0 ? "block" : "none";
  };

  this.render();

  $suggestedKeywords.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      onKeywordSelect($li.textContent);
    }
  });

  window.addEventListener("keydown", (e) => {
    const { key } = e;
    if ($suggestedKeywords.style.display !== "none") {
      const { keywords: nowKeywords, cursor: nowCursor } = this.state;
      switch (key) {
        case "ArrowUp": {
          const nextCursor =
            nowCursor === 0 ? nowKeywords.length - 1 : nowCursor - 1;
          this.setState({
            ...this.state,
            cursor: nextCursor,
          });
          break;
        }
        case "ArrowDown": {
          const nextCursor =
            nowCursor > nowKeywords.length - 1 ? 0 : nowCursor + 1;
          this.setState({
            ...this.state,
            cursor: nextCursor,
          });
          break;
        }
        case "Enter": {
          onKeywordSelect(nowKeywords[nowCursor]);
          break;
        }
        default: {
          return;
        }
      }
    }
  });
}
