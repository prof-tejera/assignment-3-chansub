import { useEffect, useState} from "react";
import Panel from "../generic/Panel.js";
import DisplayTime from "../generic/DisplayTime.js";
import Button from "../generic/Button.js";
import { convertToMinSec } from "../../utils/helpers";

//I took some inspiration from https://dmitripavlutin.com/react-useeffect-explanation/ 
//and https://stackoverflow.com/questions/61923862/how-to-pause-a-setinterval-countdown-timer-in-react


const StopWatch = () => {

    const initialSeconds = 0;
    const maxSeconds = 150;

    const [seconds, setSeconds] = useState(initialSeconds);
    const [pause, setPause] = useState(true);
    
    useEffect(() => {
        const interval = setInterval(performCount, 1000); 
        return () => {
            clearInterval(interval);
        }
    });

    const performCount = () => {
        if(!pause){
            if(seconds < maxSeconds){
                setSeconds(seconds + 1);
            }
            else if(seconds === maxSeconds){
                setPause(true);
                console.log("Stopwatch timer ends!");
            }
        }
    }

    const handlePauseToggle = () => {
        setPause(!pause);
        console.log("Stopwatch",(pause)?'unpaused':'paused');
    }
    const handleEnd = () => {
        setPause(true);
        setSeconds(maxSeconds);
        console.log("Stopwatch end called");
    }
    const handleReset = () => {
        setPause(true);
        setSeconds(initialSeconds);
        console.log("Stopwatch reset called");
    }


    return (
        <>
        <Panel className="output">
            <DisplayTime label="Time:" time={convertToMinSec(seconds)}/>
        </Panel>
        <Panel className="buttons">
            <Button className={(pause)?'btn-start':'btn-pause'}  type={(pause)?'play':'pause'} text={(pause)?'Start':'Pause'} onClick={handlePauseToggle} disabled={(seconds === maxSeconds) ? true:false}/>
            <Button className='btn-end'  type="stop" text='End' onClick={handleEnd} disabled={(seconds === 0)||(seconds === maxSeconds)? true:false}/> 
            <Button className='btn-reset' type="reset" text='Reset' onClick={handleReset} />
        </Panel>
        
        </>        
    );
};

export default StopWatch;
