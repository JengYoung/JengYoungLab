import { useRef, useEffect, useCallback } from "react";

// 1. 함수 호출을 통한 방법
const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  // 이 hook이 사라졌을 때, clear해주어야 함. 이후 타임아웃이 사라지지 않고 실행될 수 있음.
  useEffect(() => clear(), [clear]);

  return [run, clear];
};

export default useTimeoutFn;

// 2. 컴포넌트 로딩 후 바로 실행
