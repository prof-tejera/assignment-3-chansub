import {useState, useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};


//Took inspiration from here: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
export const useLocalStorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {

    const stickyValue = window.localStorage.getItem(key);
    
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];

};
