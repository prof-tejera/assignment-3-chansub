import React, { useState } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [paused, setPaused] = useState(true);
  const [progressTime, setProgressTime] = useState(0);
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
          setProgressTime(0);
          console.log("Clear hit");
        },
        addItem: (item) => setQueue((q) => [...q, item]),
        removeItem: (index) => setQueue(queue.filter((q, i) => i !== index)),
        queue,
        setQueue,
        progressTime,
        setProgressTime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
