import { usePersistedState } from "../hooks";

const HistoryView = () => {
    
    const [existingEntries] = usePersistedState('myHistoryQueue',[]);
    //let existingEntries = JSON.parse(localStorage.getItem("myHistoryQueue"));

    const ShowHistory = () =>{
        // for(let i=0; i<existingEntries.length; i++){
        //     console.log('Workout', i);
        //     let item = existingEntries[i];
        //     let itemDetails = item.map((key,index) => {
        //         console.log('Position:',index,'type:',key.type, key.duration);
        //     })
        // }

        return (
            existingEntries.map((item,index) => (
                <li key={index}><b>Workout</b> {index}
                    <ul>
                        {item.map((item2,index2) => (
                            <li key={index2}>type: {item2.type}; duration: {item2.duration}s, rounds:{item2.rounds}; desc:{item2.desc} </li>
                        ))}
                    </ul>
                </li>
            ))
        );
    };

    
    return(

        <><p>History View</p>
        
        <div className="history" >
            <ul>
                <ShowHistory/>
            </ul>
        </div>

        </>  
    );
};
  
  

export default HistoryView;