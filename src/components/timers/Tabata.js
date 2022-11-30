import { useEffect, useState} from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime  from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { convertToMinSec } from "../../utils/helpers";


const Tabata = () => {

    const initialSeconds = 30;
    const initialRounds = 3;

    const [rounds, setRounds] = useState(initialRounds);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [pause, setPause] = useState(true);
    const [rest, setRest] = useState(false);

        
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
            if(seconds === 20){
                console.log("Tabata 20 seconds reached. Now 10 seconds rest...")
                setSeconds(10);
                setRest(true);
            }
            if (seconds === 1 && rounds > 1) {
              setSeconds(initialSeconds);
              setRounds(rounds - 1);
              setRest(false);
            }
          } else if (rounds === 1 && seconds === 0) {
            console.log("Tabata timer ends!");
            setRounds(0);
            setRest(false);
            renderAction(pause,rest);
          }
        }
      };

    const handlePauseToggle = () => {
        setPause(!pause);
        console.log("Tabata ",(pause)?'unpaused':'paused');
    }
    const handleEnd = () => {
        setPause(true);
        setSeconds(0);
        setRounds(0);
        console.log("Tabata end called");
    }
    const handleReset = () => {
        setPause(true);
        setSeconds(initialSeconds);
        setRounds(initialRounds);
        console.log("Tabata reset called");
    }

    const renderAction = () => {
      if(!pause){
        if(rest) return 'Action: Rest!';
        else return 'Action: Exercise!';
      }
      return ;
    }


    return (
        <>
        <Panel className="output">
            <Panel>
              <DisplayRounds rounds={rounds}></DisplayRounds>
              <DisplayTime label="Time:" time={convertToMinSec(seconds)}/>
            </Panel>
            <Panel>
                {renderAction(pause,rest)}
            </Panel>
        </Panel>

        <Button className={(pause)?'btn-start':'btn-pause'} type={(pause)?'play':'pause'} text={(pause)?'Start':'Pause'} onClick={handlePauseToggle} disabled={(seconds === 0)? true:false}/>
        <Button className='btn-end' type='stop' text='End' onClick={handleEnd} disabled={(rounds === 0)||((rounds === initialRounds) && (seconds > 29))? true:false}/> 
        <Button className='btn-reset' type='reset' text='Reset' onClick={handleReset} />
        </>        
    );
};

export default Tabata;
