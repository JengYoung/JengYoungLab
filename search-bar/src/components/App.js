import Header from "@/components/Header";

export default function App({ $target }) {
  const header = new Header({
    $target,
    onKeywordInput: (keyword) => {
      if (keyword.trim().length > 1) {
        console.log(keyword);
      }
    },
  });
}
