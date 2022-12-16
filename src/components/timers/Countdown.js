import { useEffect, useState} from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime  from "../generic/DisplayTime.js";
import { convertToMinSec } from "../../utils/helpers";


const Countdown = () => {

    const initialSeconds = 150;

    const [seconds, setSeconds] = useState(initialSeconds);
    const [pause, setPause] = useState(true);
    
    useEffect(() => {
        const interval = setInterval(performCount, 1000); //1000 millisecond = 1 second
        return () => {
            clearInterval(interval);
        }
    });

    const performCount = () => {
        if(!pause){
            if(seconds > 0){
                setSeconds(seconds - 1);
            }
            else if(seconds === 0){
                setPause(true);
                console.log("Countdown timer ends!");
            }
        }
    }

    const handlePauseToggle = () => {
        setPause(!pause);
        console.log("Countdown",(pause)?'unpaused':'paused');
    }
    const handleEnd = () => {
        setPause(true);
        setSeconds(0);
        console.log("Countdown end called");
    }
    const handleReset = () => {
        setPause(true);
        setSeconds(initialSeconds);
        console.log("Countdown reset called");
    }


    return (
        <>
        <Panel className="output">
            <DisplayTime label="Time:" time={convertToMinSec(seconds)}/>
        </Panel>
        <Panel className="buttons">
            <Button className={(pause)?'btn-start':'btn-pause'} type={(pause)?'play':'pause'} text={(pause)?'Start':'Pause'} onClick={handlePauseToggle} disabled={(seconds === 0)? true:false}/>
            <Button className='btn-end' type='stop' text='End' onClick={handleEnd} disabled={(seconds === 0)||(seconds === initialSeconds)? true:false}/> 
            <Button className='btn-reset' type='reset' text='Reset' onClick={handleReset} />
        </Panel>
        </>        
    );
};

export default Countdown;
