import getKeyword from "@/apis/getKeyword";
import { getItem, setItem } from "@/utils/storage";
import getSearch from "@/apis/getSearch";
import Header from "@/components/Header";
import SuggestedKeywords from "@/components/SuggestedKeywords";
import SearchResults from "@/components/SearchResults";
import debounce from "@/utils/debounce";

export default function App({ $target }) {
  this.state = {
    keyword: "",
    keywords: [],
    imgResults: [],
  };

  this.cache = getItem("keywords_cache", {});

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state.keyword, nextState.keyword);
    header.setState({
      keyword: this.state.keyword,
    });
    // if (this.state.keyword !== nextState.keyword) {
    //   header.setState({
    //     keyword: this.state.keyword,
    //   });
    // }
    suggestedKeywords.setState({
      keywords: this.state.keywords,
    });
    if (this.state.imgResults.length > 0) {
      searchResults.setState(this.state.imgResults);
    }
  };
  const header = new Header({
    $target,
    initialState: {
      keyword: this.state.keyword,
    },
    onKeywordInput: debounce(async (keyword) => {
      if (keyword.trim().length > 1) {
        let keywords = null;

        if (this.cache[keyword]) {
          keywords = this.cache[keyword];
        } else {
          keywords = await getKeyword(keyword);
          this.cache[keyword] = keywords;
          setItem("keywords_cache", this.cache);
        }

        this.setState({
          ...this.state,
          keyword,
          keywords,
        });
      }
    }, 300),
    onEnter: () => {
      fetchCatsImg();
    },
  });

  const suggestedKeywords = new SuggestedKeywords({
    $target,
    initialState: {
      keywords: this.state.keywords,
      cursor: -1,
    },
    onKeywordSelect: (keyword) => {
      this.setState({
        ...this.state,
        keyword,
        keywords: [],
      });
      fetchCatsImg();
    },
  });

  const searchResults = new SearchResults({
    $target,
    initialState: this.state.imgResults,
  });
  const fetchCatsImg = async () => {
    const { data } = await getSearch(this.state.keyword);

    this.setState({
      ...this.state,
      imgResults: data,
      keywords: [],
    });
  };
}
