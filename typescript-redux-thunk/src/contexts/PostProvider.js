import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

// 현재의 상태와 일어날 액션(타입, 액션에서 받아온 페이로드)을 받는다.
// 내부에서는 async를 통해 네트워크를 호출할 수 없다. - 순수해야 하므로.
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_POSTS": {
      return action.payload;
    }
    case "ADD_POST": {
      return [...state, action.payload];
    }
    case "DELETE_POST": {
      const payload = action.payload;
      return state.filter((item) => item.id !== payload.id);
    }
    default: {
      console.error("Wrong Type!");
      break;
    }
  }
};
const PostProvider = ({
  children,
  initialPosts,
  handleDeletePost,
  handleAddPost,
}) => {
  console.log(initialPosts);
  const [posts, dispatch] = useReducer(reducer, initialPosts || []);

  useEffect(() => {
    dispatch({ type: "INIT_POSTS", payload: initialPosts || [] });
  }, [initialPosts]);

  const onAddpost = useCallback(
    async (post) => {
      console.log("post: ", post);
      const payload = await handleAddPost(post);
      dispatch({ type: "ADD_POST", payload });
    },
    [handleAddPost]
  );

  const onDeletePost = useCallback(
    async (id) => {
      const payload = await handleDeletePost(id);
      dispatch({ type: "DELETE_POST", payload });
    },
    [handleDeletePost]
  );

  return (
    <PostContext.Provider value={{ posts, onDeletePost, onAddpost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
