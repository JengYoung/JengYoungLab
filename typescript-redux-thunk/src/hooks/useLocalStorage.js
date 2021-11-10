import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item): initialValue;
    } catch(e) {
      console.error(e);
      return initialValue;
    }
  })

  const setValue = value => {
    try {
      const valueToStore = typeof value === 'function' 
        ? value(storedValue) 
        : value; 
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch(e) {
      console.error(e);
    }

    return [storedValue, setValue]
  }

  return [storedValue, setValue]
}

export default useLocalStorage;
