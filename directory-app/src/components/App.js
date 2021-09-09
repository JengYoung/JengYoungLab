import Nodes from "@/components/Nodes";
import { request } from "@/apis/request";
import { DIRECTORY_TYPE, FILE_TYPE } from "@/utils/constants";
import ImageViewer from "@/components/imageViewer";

export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
  };

  const API_END_POINT = process.env.API_END_POINT;

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
      }

      if (node.type === FILE_TYPE) {
        this.setState({
          ...this.state,
          selectedImageUrl: `${API_END_POINT}/static${node.filePath}`,
        });
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
  };

  const fetchNodes = async (id) => {
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
    });
  };
  fetchNodes();
}
