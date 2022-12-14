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
  
  const [editVisible, setEditVisible] = useState(false);


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
          const updatedQ = queue.map((q,i) => (i === index ? item : q));  //update that contents of that queue index item
          setQueue(updatedQ);
        },
        removeItem: (index) => setQueue(queue.filter((q, i) => i !== index)),  //get me everything except for that index
        editPosition: (fromIndex, toIndex) => {
          console.log("move from ",fromIndex, " to ", toIndex);
          setQueue(arrMove(queue,fromIndex,toIndex));
        },
        queue,
        setQueue,
        progressTime,
        setProgressTime,
        editVisible,
        setEditVisible
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export default AppProvider;
