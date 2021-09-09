import names from "@/utils/classNames";
import { DIRECTORY_TYPE } from "@/utils/constants";
export default function Nodes({ $target, initialState, onClick }) {
  const DIR_APP_PREV_SRC = process.env.DIR_APP_PREV_SRC;
  const DIR_APP_FILE_SRC = process.env.DIR_APP_FILE_SRC;
  const DIR_APP_DIR_SRC = process.env.DIR_APP_DIR_SRC;

  const { _node, _nodes } = names;
  const $nodes = document.createElement("div");
  $target.appendChild($nodes);
  $nodes.classList.add(_nodes);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
      ${
        isRoot
          ? ""
          : `
          <div class="${_node}">
            <img src="${DIR_APP_PREV_SRC}" alt="뒤로가기 버튼" />
          </div>
          `
      }
      ${nodes
        .map(
          (node) => `
          <div class="${_node}">
            <img src="
              ${
                node.type === DIRECTORY_TYPE
                  ? DIR_APP_DIR_SRC
                  : DIR_APP_FILE_SRC
              }
            " alt="" />
            ${node.name}
          </div>
        `
        )
        .join("")}
    `;
  };

  this.render();
}
