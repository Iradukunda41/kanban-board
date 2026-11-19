import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value === null) return; // nothing loaded yet, so don't save
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked, ignore
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;