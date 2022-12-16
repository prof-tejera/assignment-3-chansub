import { useEffect, useState} from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime  from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { convertToMinSec } from "../../utils/helpers";


const XY = () => {

    const initialSeconds = 5;
    const initialRounds = 3;

    const [rounds, setRounds] = useState(initialRounds);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [pause, setPause] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(performCount, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      });

    const performCount = () => {
        if (!pause) {
          if (seconds > 0) {
            setSeconds(seconds - 1);
            if (seconds === 1 && rounds > 1) {
              setSeconds(initialSeconds);
              setRounds(rounds - 1);
            }
          } else if (rounds === 1 && seconds === 0) {
            console.log("XY timer ends!");
            setRounds(0);
          }
        }
      };

    const handlePauseToggle = () => {
        setPause(!pause);
        console.log("XY",(pause)?'unpaused':'paused');
    }
    const handleEnd = () => {
        setPause(true);
        setSeconds(0);
        setRounds(0);
        console.log("XY end called");
    }
    const handleReset = () => {
        setPause(true);
        setSeconds(initialSeconds);
        setRounds(initialRounds);
        console.log("XY reset called");
    }


    return (
        <>
        <Panel className="output">
            <Panel>
              <DisplayRounds rounds={rounds}></DisplayRounds>
              <DisplayTime label="Time:" time={convertToMinSec(seconds)}/>
            </Panel>
        </Panel>
        
        <Button className={(pause)?'btn-start':'btn-pause'} type={(pause)?'play':'pause'} text={(pause)?'Start':'Pause'} onClick={handlePauseToggle} disabled={(seconds === 0)? true:false}/>
        <Button className='btn-end' type='stop' text='End' onClick={handleEnd} disabled={(rounds === 0)||(rounds === initialRounds)? true:false}/> 
        <Button className='btn-reset' type='reset' text='Reset' onClick={handleReset} />
        </>        
    );
};

export default XY;
