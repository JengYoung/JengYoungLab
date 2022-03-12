export default function HomePage({
  $target,
  initialState,
}) {
  const $page = document.createElement('div');
  $page.classList.add('page');
  $target.appendChild($page);
}