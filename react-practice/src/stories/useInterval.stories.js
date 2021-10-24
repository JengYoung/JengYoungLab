import { useState } from "react";
import useInterval from "../hooks/useInterval";

export default {
  title: "Hook/useInterval",
};

export const Default = () => {
  const [array, setArray] = useState([]);

  const clear = useInterval(() => {
    setArray([...array, "추가됨"]);
  }, 1000);

  return (
    <>
      <div>useInterval test</div>
      <div>{array}</div>
      <button onClick={clear}>멈추어</button>
    </>
  );
};
