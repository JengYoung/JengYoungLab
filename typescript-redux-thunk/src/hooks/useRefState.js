import { useRef, useCallback, useState } from "react";

const useRefState = (initialState) => {
  const frame = useRef(0);

  const [state, setState] = useState(initialState);

  const setRefState = useCallback((value) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  return [state, setRefState];
};

export default useRefState;
