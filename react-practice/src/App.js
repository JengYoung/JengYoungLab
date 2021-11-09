import { Route, Routes } from "react-router-dom";
import { TodoPage } from "@pages";
import DefaultTemplate from "./components/template/DefaultTemplate";

function App() {
  return (
    <DefaultTemplate>
      <Routes>
        <Route exact path="/">
          HOME
        </Route>
        <Route exact path="/posts" element={TodoPage}></Route>
      </Routes>
    </DefaultTemplate>
  );
}

export default App;
