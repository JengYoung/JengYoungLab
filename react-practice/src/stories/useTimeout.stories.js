import useTimeout from "../hooks/useTimeout";

export default {
  title: "Hook/usetimeout",
};

export const Default = () => {
  const clear = useTimeout(() => {
    alert("실행!");
  }, 3000);

  return (
    <>
      <div>useTimeout test</div>
      <button onClick={clear}>멈춰!</button>
    </>
  );
};
