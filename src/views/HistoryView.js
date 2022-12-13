import "./HistoryView.css";
import { usePersistedState } from "../hooks";

const HistoryView = () => {
    
    const [existingEntries] = usePersistedState('myHistoryQueue',[]);

    const ShowHistory = () =>{

        return (
            existingEntries.map((item,index) => (
                <li key={index} className="workout"><b>Workout</b> {index+1}
                    <ol>
                        {item.map((item2,index2) => (
                            <li key={index2} className="details">
                                <span className="workoutType">{item2.type}:</span> 
                                Total Duration: {item2.duration};  
                                &nbsp;Seconds: {item2.seconds}; 
                                {(item2.secondsRest) ? ` Seconds of Rest: ${item2.secondsRest}; ` : ''}
                                {(item2.rounds) ? ` Rounds: ${item2.rounds}; ` : ' '}
                                {(item2.desc) ? ` Desc: ${item2.desc}; ` : ''}

                            </li>
                        ))}
                    </ol>
                </li>
            ))
        );
    };

    
    return(

        <>
        <div className="historyView" >
            <h1 className="heading">History View</h1>
            <ul>
                <ShowHistory/>
            </ul>
        </div>

        </>  
    );
};
  
  

export default HistoryView;