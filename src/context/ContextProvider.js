import React, { useState } from "react";
import { usePersistedState } from "../hooks";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  //const [queue, setQueue] = usePersistedState('myCurrentWorkout',[]); //we are not storing this in local storage
  const [queue, setQueue] = useState([]);
  const [paused, setPaused] = usePersistedState('myPause',true);
  const [progressTime, setProgressTime] = usePersistedState('myProgressTime',0);
  const [activeIndex, setActiveIndex] = usePersistedState('myActiveIndex',0);

   //from https://www.w3docs.com/snippets/javascript/how-to-move-an-array-element-from-one-array-position-to-another.html
  function arrMove(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
      let i = newIndex - arr.length + 1;
      while (i--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

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
        setProgressTime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export default AppProvider;
