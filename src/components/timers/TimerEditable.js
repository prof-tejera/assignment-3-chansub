import {useState, useContext} from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import {DropdownTime} from "../generic/Dropdown";
import Textbox  from "../generic/Textbox";
import { AppContext } from "../../context/ContextProvider";


const TimerEditable = ({data}) => {    
    const [seconds, setSeconds] = useState(data.duration);
    const [desc, setDesc] = useState(data.desc);
    const {editItem} = useContext(AppContext);

    return (
        <>
            <Panel className='editItem'> 
            [Edit {data.type}] 
            <DropdownTime id="selectItem" value={seconds} onChange={(e) => {
            setSeconds(e.target.value);
            } } />
            <div>
            <Textbox placeholder="Optional description " className="itemTextbox" id="itemTextbox" maxLength="100" value={desc} onChange={e => setDesc(e.target.value)}/>
            
            <Button text="Update Timer"
                onClick={() => {
                    console.log('edit item and new seconds', data.index, seconds);
                     editItem({
                         type: data.type,
                         duration: seconds,
                         desc: desc
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
