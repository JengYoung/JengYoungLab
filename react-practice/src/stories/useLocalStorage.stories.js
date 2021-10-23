import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default {
  title: 'Hook/useLocalStorage',
  component: useLocalStorage,
  argTypes: {
  },
};

export const Default = () => {
  const [status, setStatus] = useLocalStorage('status', '404 NOT FOUND');

  return (
    <div>
      <button onClick={() => setStatus('200 OK')}>Resend</button>
      {status}
    </div>
  )
}
