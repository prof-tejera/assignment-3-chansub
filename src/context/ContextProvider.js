import React, { useState } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [paused, setPaused] = useState(true);
  const [message, setMessage] = useState('hello');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AppContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        paused,
        setPaused,
        reset: () => {
          setActiveIndex(0);
          setPaused(true);
        },
        clear: () => {
          setQueue([]);
          setActiveIndex(0);
          setPaused(true);
          console.log("Clear hit");
        },
        addItem: (item) => setQueue((q) => [...q, item]),
        removeItem: (index) => setQueue(queue.filter((q, i) => i !== index)),
        queue,
        setQueue,
        message,
        setMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
