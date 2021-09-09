import Nodes from "@/components/Nodes";

const DUMMY_DATA = [
  {
    id: "1",
    name: "노란고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "3",
    name: "까만고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "10",
    name: "고등어무늬 고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "13",
    name: "삼색이 고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "14",
    name: "회색고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "20",
    name: "하얀고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
];

const DUMMY_DATA_2 = [
  {
    id: "5",
    name: "2021/04",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: "1",
    },
  },
  {
    id: "19",
    name: "물 마시는 사진",
    type: "FILE",
    filePath: "/images/a2i.jpg",
    parent: {
      id: "1",
    },
  },
];
export default function App({ $target }) {
  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: false,
      nodes: DUMMY_DATA_2,
    },
    onPrevClick: () => {},
    onClick: () => {},
  });
}
