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
  const [urlPath, setUrlPath] = usePersistedState('myUrlPath','');
  //const navigate = useNavigate(); //this errors out "useNavigate() may be used only in the context of a <Rounter> component."


  function SetQueryString(){
    //grab queue and turn into querystring
    
    console.log("queue ", queue);
    let qs = '?';
    for(let i in queue){
      if(i < 3){
        let qsItem = new URLSearchParams(queue[i]);
        qs += qsItem + "&pos=&";
      }
    }
      
    console.log("QS is", qs);
    
    return qs;
    //navigate(qs);  //set the URL
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
          setUrlPath('');
          console.log("Clear hit");
        },
        addItem: (item) => {
          setQueue((q) => [...q, item]);
          setUrlPath(SetQueryString) //why is first one always missing?
        },
        removeItem: (index) => setQueue(queue.filter((q, i) => i !== index)),
        queue,
        setQueue,
        progressTime,
        setProgressTime,
        urlPath,
        setUrlPath
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export default AppProvider;
