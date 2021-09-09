import Nodes from "@/components/Nodes";
import { request } from "@/apis/request";
import { DIRECTORY_TYPE, FILE_TYPE } from "@/utils/constants";
import ImageViewer from "@/components/imageViewer";
import Loading from "@/components/Loading";

export default function App({ $target }) {
  const API_END_POINT = process.env.API_END_POINT;

  this.state = {
    isRoot: true,
    isLoading: false,
    nodes: [],
    paths: [], // 디렉토리를 클릭할 때마다 쌓아준다.
  };

  const loading = new Loading({
    $target,
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
      selectedImageUrl: null,
    },
    onClick: async (node) => {
      if (node.type === DIRECTORY_TYPE) {
        await fetchNodes(node.id);
        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        });
      }

      if (node.type === FILE_TYPE) {
        this.setState({
          ...this.state,
          selectedImageUrl: `${API_END_POINT}/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      const nextPaths = [...this.state.paths];
      nextPaths.pop();
      this.setState({
        ...this.state,
        paths: nextPaths,
      });

      if (!this.state.paths.length) {
        await fetchNodes();
      } else {
        await fetchNodes(this.state.paths[this.state.paths.length - 1].id);
      }
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    imageViewer.setState({
      selectedImageUrl: this.state.selectedImageUrl,
    });

    loading.setState(this.state.isLoading);
  };

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false,
    });
  };
  fetchNodes();
}
