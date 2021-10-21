import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";
import ToastItem from "./ToastItem";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1500;
`;

const ToastManager = ({ bind }) => {
  const [toasts, setToasts] = useState([]);

  const createToast = useCallback((message, duration) => {
    const newToast = {
      id: v4(),
      message,
      duration,
    };
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          id={id}
          message={message}
          duration={duration}
          key={id}
          onDone={() => removeToast(id)}
        ></ToastItem>
      ))}
    </Container>
  );
};

export default ToastManager;
