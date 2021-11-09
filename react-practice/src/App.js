import { Route, Routes } from "react-router-dom";
import { TodoPage, PostsPage, PostPage, NotFoundPage } from "@pages";
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
        <Route exact path="/"></Route>
        <Route exact path="/todo" element={<TodoPage />}></Route>
        <Route exact path="/posts" element={<PostsPage />}></Route>
        <Route exact path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </DefaultTemplate>
  );
};

export default App;
