import names from "@/utils/classNames";
import { DATA_TYPE_ID, TEXT_NOT_EXIST } from "@/utils/constants";

export default function TodoList({ $target, initialState, onDrop, onRemove }) {
  const $todoList = document.createElement("div");
  $todoList.setAttribute("droppable", "true");
  this.state = initialState;
  $target.appendChild($todoList);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { removeBtn } = names;
    const { title, todos = [] } = this.state;

    $todoList.innerHTML = `
      <h1>${title}</h1>
      <ul>
        ${todos
          .map((todo) => {
            const { _id, content } = todo;
            return `
              <li data-id="${_id}" draggable="true">
                ${content}
                <button class="${removeBtn}">❌</button>
              </li>
            `;
          })
          .join("")}
      </ul>
      ${!todos.length ? TEXT_NOT_EXIST : ""}
    `;
  };

  this.render();

  $todoList.addEventListener("dragstart", (e) => {
    const $li = e.target.closest("li");

    // 시작할 때 데이터를 넣어줄 수 있다!
    e.dataTransfer.setData(
      DATA_TYPE_ID,
      JSON.stringify({
        id: $li.dataset.id,
        content: $li.textContent,
      })
    );
  });

  $todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dragEffect = "move"; // +로 바뀜
  });

  $todoList.addEventListener("drop", (e) => {
    console.log(e);
    e.preventDefault();
    const todoId = JSON.parse(e.dataTransfer.getData(DATA_TYPE_ID)).id;

    // not now todo => alert to super component
    const { todos } = this.state;

    if (!todos.find(({ _id }) => _id === todoId)) onDrop(todoId);
  });

  $todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo__remove-btn")) {
      const id = e.target.closest("li").dataset.id;
      if (id) onRemove(id);
    }
  });
}
