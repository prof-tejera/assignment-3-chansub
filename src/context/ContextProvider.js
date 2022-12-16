import React, { useState } from "react";
import { usePersistedState } from "../hooks";
import { arrMove } from "../utils/helpers";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  //const [queue, setQueue] = usePersistedState('myCurrentWorkout',[]); //we are not storing this in local storage
  const [queue, setQueue] = useState([]);
  const [paused, setPaused] = usePersistedState('myPause',true);
  const [progressTime, setProgressTime] = usePersistedState('myProgressTime',0);
  const [activeIndex, setActiveIndex] = usePersistedState('myActiveIndex',0);
  
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
        addItem: (item) => {
          setQueue((q) => [...q, item]);
        },
        editItem: (item, index) => {
          const updatedQ = queue.map((q,i) => (i === index ? item : q));  
          setQueue(updatedQ);
        },
        removeItem: (index) => setQueue(queue.filter((q, i) => i !== index)),  
        editPosition: (fromIndex, toIndex) => {
          console.log("move from ",fromIndex, " to ", toIndex);
          setQueue([...arrMove(queue,fromIndex,toIndex)]); //arrMove() modifies the original array, but does not change the reference (for rerender). Need to do spread notation to clone into a new array to work.
        },
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
