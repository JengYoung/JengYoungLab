import names from "@/utils/classNames";

export default function Breadcrumb({ $target, initialState, onClick }) {
  const { _breadcrumb, _breadcrumbItem } = names;
  const $breadcrumb = document.createElement("nav");
  $breadcrumb.classList.add(_breadcrumb);
  $target.appendChild($breadcrumb);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $breadcrumb.innerHTML = `
      <div class="${_breadcrumbItem}">Root</div>
      ${this.state
        .map(
          ({ id, name }) => `
            <div data-id="${id}" class="${_breadcrumbItem}">${name}</div>
          `
        )
        .join("")}
    `;
  };

  this.render();

  $breadcrumb.addEventListener("click", (e) => {
    const $breadcrumbItem = e.target.closest(`.${_breadcrumbItem}`);
    console.log($breadcrumbItem);
    const { id } = $breadcrumbItem.dataset;
    console.log(id);
    onClick(id);
  });
}
