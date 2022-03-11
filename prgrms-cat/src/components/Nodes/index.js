import { NODE_TYPE_DIR } from "@/utils/constants.js";
import { names, PREFIX_CLASS } from "@/utils/names.js";

export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
    const $nodes = document.createElement('div');
    $nodes.classList.add(names.nodes);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = { 
            ...this.state,
            ...nextState
        }

        this.render();
    }

    this.render = () => {
        $nodes.innerHTML = `
            ${isRoot 
                ? `                
                    <div class="${names.node}" data-id="-1">
                        <img src="./assets/prev.png">
                    </div>
                `
                : ''
            }
            ${nodes.map(node => `
                <div class="${names.node}" data-id="${node.id}">
                    <img src="./assets/${node.type === NODE_TYPE_DIR ? 'directory' : 'file'}.png">
                    <div>${node.name}</div>
                </div>
            `).join('')}
        `;

        $target.appendChild($nodes);
    }

    $nodes.addEventListener('click', (e) => {
        const $node = e.target.closest(PREFIX_CLASS + names.node);
        const { id } = $node.dataset;

        const node = this.state.nodes.find(node => node.id === id);

        if (node) {
            onClick(node);
        } else {
            onPrevClick();
        }
    })
}