import { useState, useRef, useCallback } from "react";

/*
  네트워크, 타이머 로직이 있을 때 사용
  1. lastCallId에서 useRef를 통해 count할 수 있도록 한다.
  2. callback 내부에서는 callId를 통해 호출할 때마다 `lastCallId`를 1씩 증가시켜준다.
  3. 만약 로딩이 안 되었다면 로딩이 되도록 설정해준다.
  4. 로딩 후에는 함수를 실행시킨다. 이때, 성공했으면 value를, 실패했으면 error을 내뱉는다.
  5. 그리고 특이한 것은 `callId === lastCallId.current`이다. 비동기적으로 호출했을 때 연달아서 함수를 호출할 수도 있기 때문에, 그 동안 로딩을 보장해야 한다. 따라서 둘이 같을 때 로딩이 꺼지도록 한다.
*/
const useAsyncFn = (fn, deps) => {
  const lastCallId = useRef(0);
  const [state, setState] = useState({ isLoading: false });

  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current;

    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn(...args).then(
      (value) => {
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
    // eslint-disable-next-line
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
