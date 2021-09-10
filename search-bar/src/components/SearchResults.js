import names from "@/utils/classNames";

export default function SearchResults({ $target, initialState }) {
  const { _searchResults } = names;
  const $searchResults = document.createElement("div");
  $searchResults.classList.add(_searchResults);
  $target.appendChild($searchResults);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $searchResults.innerHTML = `
      ${this.state
        .map(
          ({ url }) => `
        <div>
          <img src="${url}"></img>
        </div>
      `
        )
        .join("")}
    `;
  };

  this.render();
}
