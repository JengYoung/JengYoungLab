import { Route, Routes } from "react-router-dom";
import { PostPage, PostsPage } from "@pages/index";
import DefaultTemplate from "@components/template/DefaultTemplate";

/*
  컴포넌트는 최대한 순수할 수록 좋다.
  1. 사이드 이펙트를 걱정하지 않아도 좋다.
  2. 확장에 유연하다.
  3. 테스트가 쉽다.
*/

// app by axios practice

const App = () => {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/"></Route>
        {/* <Route path="/todo" element={<TodoPage />}></Route> */}
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        {/* <Route path="*" element={<NotFoundPage />}></Route> */}
      </Routes>
    </DefaultTemplate>
  );
};

export default App;
