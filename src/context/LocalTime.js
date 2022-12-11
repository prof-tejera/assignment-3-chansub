import { useContext, useState } from "react";
import { useInterval, usePersistedState } from "../hooks";
import { AppContext } from "./ContextProvider";

import DisplayTime  from "../components/generic/DisplayTime.js";
import { convertToMinSec } from "../utils/helpers";
import Button from "../components/generic/Button";
import Panel from "../components/generic/Panel";
import DisplayRounds from "../components/generic/DisplayRounds";

const Timer = ({ duration, rounds, index, type, isHome, desc }) => {
  const { activeIndex, paused, setPaused, setActiveIndex, removeItem, queue, setProgressTime} = useContext(AppContext);
  
  const [setHistoryQueue] = usePersistedState('myHistoryQueue',[]);

  const [time, setTime] = useState(0);
  const active = activeIndex === index; 

  useInterval(() => {
    //if end has reached, reset 
    if(activeIndex === queue.length){
      console.log("End reached!");
      setPaused(true);
      setActiveIndex(0);
      setTime(0);
      setProgressTime(0);

      //add to history log. TODO: new entries
      let existingEntries = JSON.parse(localStorage.getItem("myHistoryQueue"));
      if(existingEntries == null) existingEntries = [];
      existingEntries.push(queue);
      setHistoryQueue(existingEntries);

      return;
    }
    
    if (paused || !active) return;
    
    if (`${time}` === `${duration}`){
        setActiveIndex(index + 1);
    } 
    else {
      setTime((c) => c + 1);
      setProgressTime((j) => j + 1);
    }
  }, 1000);

  function DisplayRoundsTime(){
    if(type === 'XY'||(type === 'Tabata')){
      return <><DisplayRounds rounds={rounds} /> {(rounds>1)?'rounds':'round'} x <DisplayTime label='' myClassName='noPadding' time={convertToMinSec(duration/rounds)} /> <br/>Description: {desc}</>
    }
    else{
      return <><DisplayTime time={convertToMinSec(duration)}/> <br/>Description: {desc}</>
    }
  }

  function DisplayProgress(){
    const [myActiveRound, setMyActiveRound] = useState(0);

    if(!active) return;

    if(active && type === 'Countdown'){
      return (<span> (Progress: {convertToMinSec(duration-time)})</span>)
    }
    else if(active && (type==='XY' || type==='Tabata')){
 
      let timePerRound = duration/rounds;
      let timeSoFar = duration-time;  
 
      if((timePerRound*myActiveRound < time) && (timeSoFar < duration)){
         setMyActiveRound(myActiveRound+1);
      }
      return (<span> ({myActiveRound} of {rounds} Progress: {convertToMinSec(time)})</span>)
    }
    else{
      return (<span> (Progress: {convertToMinSec(time)})</span>)
    }
  }
 
  return (
      <Panel id={'q'+index} className={active ? "yellowBG" : "whiteBG"}>
        <Button onClick={() => removeItem(index)} style={{display: (isHome === 'no') ? 'inline-block' : 'none'}} type="remove" text="Remove"/>
        {type} - <DisplayRoundsTime/> <DisplayProgress/>
      </Panel>
  );
};

export default Timer;
