// import { Route, Routes } from "react-router-dom";
// import { TodoPage } from "@pages";
// import DefaultTemplate from "./components/template/DefaultTemplate";

import axios from "axios";
import { Header, Spinner } from "@components/base";
import { useAsync } from "@hooks";
import { PostList, PostAddForm } from "@components/domain";
import PostProvider from "@contexts/PostProvider";
import { useCallback } from "react";

/*
  컴포넌트는 최대한 순수할 수록 좋다.
  1. 사이드 이펙트를 걱정하지 않아도 좋다.
  2. 확장에 유연하다.
  3. 테스트가 쉽다.
*/

// app by axios practice
const App = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);
  }, []);

  const handleAddPost = useCallback(async (post) => {
    return await axios
      .post("https://jsonplaceholder.typicode.com/posts", post)
      .then((response) => response.data);
  }, []);

  const handleDeletePost = useCallback(async (id) => {
    return await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleDeletePost={handleDeletePost}
      handleAddPost={handleAddPost}
    >
      <Header>Posts</Header>
      <PostAddForm></PostAddForm>
      {initialPosts.isLoading ? <Spinner></Spinner> : <PostList></PostList>}
    </PostProvider>
  );
};

// function App() {
//   return (
//     <DefaultTemplate>
//       <Routes>
//         <Route exact path="/">
//           HOME
//         </Route>
//         <Route exact path="/posts" element={TodoPage}></Route>
//       </Routes>
//     </DefaultTemplate>
//   );
// }

export default App;
