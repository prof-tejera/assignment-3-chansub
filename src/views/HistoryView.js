import "./HistoryView.css";
import { usePersistedState } from "../hooks";

const HistoryView = () => {
    
    const [existingEntries, setExistingEntries] = usePersistedState('myHistoryQueue',[]);

    const ShowHistory = () =>{

        return (
            existingEntries.map((item,index) => (
                <li key={index} className="workout"><b>Workout</b> {index+1}
                    <ol>
                        {item.map((item2,index2) => (
                            <li key={index2} className="details">
                                <span className="workoutType">{item2.type}:</span> 
                                Total Duration: {item2.duration};  
                                {(item2.rounds) ? ` Rounds: ${item2.rounds}; ` : ' '}
                                &nbsp;Seconds: {item2.seconds}; 
                                {(item2.secondsRest) ? ` Seconds of Rest: ${item2.secondsRest}; ` : ''}
                                {(item2.desc) ? ` Description: ${item2.desc}; ` : ''}

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
            <h1 className="heading">Workout History</h1>

            {(existingEntries.length > 0) &&
                <center><button onClick={() => setExistingEntries([])}>Clear History</button></center>
            }
            <ul>
                { (existingEntries.length === 0) && 
                    <p>No history available.</p>
                }
                <ShowHistory/>
            </ul>
        </div>

        </>  
    );
};
  
  

export default HistoryView;