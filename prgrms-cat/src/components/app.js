import getNodes from "@/apis/Nodes/getNodes.js";
import { NODE_TYPE_DIR, NODE_TYPE_FILE } from "@/utils/constants.js"

export default function App({ $target }) {
    const initialState = {
        isRoot: true,
        isLoading: true,
        nodes: [], // 현재 하위 디렉토리나 파일을 보여주는 배열. 
        paths: [], // 현재 내가 클릭한 디렉토리들을 보여주는 배열.
        activePath: '',
    }

    this.state = { ...initialState }
    
    const BreadCrumb = new BreadCrumb({
        $target,
        initialState: {
            isLoading: false,
            paths: this.state.paths
        },
        onClick: (id) => {
            console.log(id)
        }
    })


    const Nodes = new Nodes({
        $tareget,
        initialState: {
            isRoot: this.state.isRoot,
            isLoading: false,
            nodes: this.state.nodes
        },

        onClick: async (node) => {
            if (node.type === NODE_TYPE_DIR) {
                await getNodes(node.id);
                
                this.setState({
                    paths: [...this.state.paths, node]
                })
            }

            if (node.type === NODE_TYPE_FILE) {
                this.setState({
                    activePath: node
                })
            }
        },

        onPrevClick: () => {
            if (!this.state.paths.length) {
                alert('더 이상 뒤로 갈 수 없습니다!');
                return;
            }

            const nextPaths = [...this.state.paths];

            this.setState({
                paths: nextPaths
            })

            this.state.paths.length 
                ? await fetchNodes(this.state.paths[this.state.paths.length - 1].id)
                : await fetchNodes();
        }
    })

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            nextState
        }
    }

    const fetchNodes = async (id) => {
        this.setState({
            isLoading: true,
        })

        const nodes = await getNodes(`/${id ?? ''}`);

        this.setState({
            isLoading: false,
            isRoot: !!id,
            nodes
        })
    }

    fetchNodes();
} 