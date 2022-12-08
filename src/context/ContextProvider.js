import React, { useState } from "react";
import { usePersistedState } from "../hooks";
import { useNavigate} from "react-router-dom";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = usePersistedState('myCurrentWorkout',[]);
  //const [queue, setQueue] = useState([]);
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
