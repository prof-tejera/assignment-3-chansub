import {useState, useContext} from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import {DropdownTime, DropdownRounds} from "../generic/Dropdown";
import Textbox  from "../generic/Textbox";
import { AppContext } from "../../context/ContextProvider";


const TimerEditable = ({data}) => {    
    const [seconds, setSeconds] = useState(data.seconds);
    const [secondsRest, setSecondsRest] = useState(parseInt(data.secondsRest));
    const [desc, setDesc] = useState(data.desc);
    const [rounds, setRounds] = useState(data.rounds,0);
    const {editItem} = useContext(AppContext);

    return (
        <>
            <Panel className='editItem'> 
            [Edit {data.type}]&nbsp;

            {(data.type === 'Tabata') || (data.type === 'XY') && 
                <DropdownRounds id="selectRounds" value={rounds} onChange={(e) => {setRounds(e.target.value);} } />
            }
            
            <DropdownTime id="selectItem" value={seconds} onChange={(e) => {setSeconds(e.target.value);} } />

            {(data.type === 'Tabata') && 
                <DropdownTime id="selectSecondsRest" value={secondsRest} onChange={(e) => {setSecondsRest(e.target.value);} } />
            }
            
            <div>
                <Textbox placeholder="Optional description " className="itemTextbox" id="itemTextbox" maxLength="100" value={desc} onChange={e => setDesc(e.target.value)}/>
            
                <Button text="Update Timer"
                onClick={() => {
                     editItem({
                         type: data.type,
                         duration: seconds,
                         desc: desc,
                         rounds: rounds,
                         seconds: seconds,
                         secondsRest: secondsRest
                    }, data.index)
                } }
                >
                </Button>
            </div>
            </Panel>


        </>        
    );
};






export default TimerEditable;
