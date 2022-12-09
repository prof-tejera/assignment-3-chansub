import { usePersistedState } from "../hooks";

const HistoryView = () => {
    
    const [history, setHistory] = usePersistedState('myHistoryQueue',[]);
    let existingEntries = JSON.parse(localStorage.getItem("myHistoryQueue"));

    console.log("existingEntries",existingEntries);

    return(

        <><p>History View</p>
        
        <div className="history" >
            
        
        

        </div>
        
        </>  
    );
};

export default HistoryView;