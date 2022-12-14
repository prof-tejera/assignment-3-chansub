import { useContext, useState } from "react";
import { useInterval, usePersistedState } from "../hooks";
import { AppContext } from "./ContextProvider";

import DisplayTime  from "../components/generic/DisplayTime.js";
import { convertToMinSec } from "../utils/helpers";
import Button from "../components/generic/Button";
import Panel from "../components/generic/Panel";
import DisplayRounds from "../components/generic/DisplayRounds";

import TimerEditable from "../components/timers/TimerEditable";

const Timer = ({ id, duration, rounds, index, type, isHome, desc, seconds, secondsRest }) => {
  const { activeIndex, paused, setPaused, setActiveIndex, removeItem, queue, setProgressTime, editPosition} = useContext(AppContext);
  // eslint-disable-next-line 
  const [historyQueue, setHistoryQueue] = usePersistedState('myHistoryQueue',[]);
  const [time, setTime] = useState(0);
  const [editVisible, setEditVisible] = useState(false); 
  const [myActiveRound, setMyActiveRound] = useState(0);

  const active = activeIndex === index; 

  const timerObj = {
    id:id, 
    duration:Number(duration) || 0, 
    rounds: Number(rounds) || 1, 
    index:index, 
    type:type, 
    desc:desc, 
    seconds:Number(seconds), 
    secondsRest: Number(secondsRest) || 0, 
  };


  useInterval(() => {
    //if end has reached, reset 
    if(activeIndex === queue.length){
      console.log("End reached!");
      setPaused(true);
      setActiveIndex(0);
      setTime(0);
      setProgressTime(0);

      //add to history log.
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

      if((type==='XY')||(type==='Tabata')){
        let timePerRound = duration/rounds;
        let timeSoFar = duration-time;  
 
        if((timePerRound*myActiveRound < time) && (timeSoFar < duration)){
          setMyActiveRound(myActiveRound+1);
        }
      }
    }
  }, 1000);
 
  return (<>
      <Panel className={(active) ? "yellowBG" : "whiteBG"}>

        <table width="100%" className="noBorder">
          <tbody>
          <tr>
            <td width="25%">
              { (isHome === 'no') && <>
                { (paused) && <>
                  <div className="editButtons">
                    <select value={index} onChange={(e)=>editPosition(index, e.target.value)}>
                        {queue.map((q,i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <Button onClick={() => setEditVisible(!editVisible)} type={editVisible ? 'close':'edit'} text={editVisible ? 'Hide Edit':'Show Edit'}/>
                    <Button onClick={() => removeItem(index)} style={{display: (isHome === 'no') ? 'inline-block' : 'none'}} type="remove" text="Remove"/>
                  </div>
                  </>
                }
              </>
              }
            </td>
            <td width="50%">
              <div className="queueDetails">
                <b>{type}:</b> 
                {(type === 'XY') &&
                    <>
                      <DisplayRounds rounds={rounds} /> @ <DisplayTime label='' myClassName='noPadding' time={convertToMinSec(seconds)} /> = <DisplayTime label='' myClassName='noPadding' time={convertToMinSec(duration)} />
                    </>
                }
                {(type === 'Tabata') &&
                    <>
                      <DisplayRounds rounds={rounds} /> @ (<DisplayTime label='' myClassName='noPadding' time={convertToMinSec(seconds)} /> work +&nbsp; 
                      <DisplayTime label='' myClassName='noPadding' time={convertToMinSec(secondsRest)} /> rest) = <DisplayTime label='' myClassName='noPadding' time={convertToMinSec(duration)} />              
                    </>
                } 
                {((type === 'Countdown')||(type === 'Stopwatch')) &&
                  <>
                    <DisplayTime time={convertToMinSec(duration)}/>
                  </>
                }
                {(desc) &&
                  <div><span><b>Description:</b> {desc}</span></div>
                }
              </div>
            </td>
            <td width="25%">
                {(active) &&
                  <>
                    <span>
                      {((type === 'XY')||(type==='Tabata')) ? `${myActiveRound} of ${rounds} `: ''}
                      Progress: {(type === 'Countdown') ? `${convertToMinSec(duration-time)}`: `${convertToMinSec(time)}` }
                    </span>
                  </>
                }
            </td>
          </tr>
          </tbody>
        </table>

       
        {editVisible && 
           <TimerEditable data={timerObj}/>
        }

      </Panel>

      </>
  );
};

export default Timer;
