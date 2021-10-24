import { useState } from "react";
import useIntervalFn from "../hooks/useIntervalFn";

export default {
  title: "Hook/useIntervalFn",
};

export const Default = () => {
  const [array, setArray] = useState([]);

  const [run, clear] = useIntervalFn(() => {
    setArray([...array, "추가됨"]);
  }, 1000);

  return (
    <>
      <div>useIntervalFn test</div>
      <div>{array}</div>
      <button onClick={run}>추가</button>
      <button onClick={clear}>멈추어</button>
    </>
  );
};
