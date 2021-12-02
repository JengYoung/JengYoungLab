import TodosProvider from "../contexts/TodosProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <Component {...pageProps} />
    </TodosProvider>
  );
}

export default MyApp;
