export default function BreadCrumb({ 
  $target,
  initialState,
  onClick
}) {
  const $breadcrumb = document.createElement('.nav');
  $breadcrumb.classList.add('Breadcrumb');
  $target.appendChild($breadcrumb);

  this.state = { ...initialState };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  this.render = () => {
    $breadcrumb.innerHTML = `
      <div>root</div>
      ${this.state.paths.map(({ id, name }) => `
        <div data-id="${id}" class="Breadcrumb__Item">
          ${name}
        </div>
      `).join("")}
    `;
  }

  $breadcrumb.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest(".Breadcrumb__Item");
    const { id } = $breadcrumbItem.dataset;
    
    onClick(id);
  })
}