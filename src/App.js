import React, {useContext, useState, useEffect} from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import DocumentationView from "./views/DocumentationView";
import HistoryView from "./views/HistoryView";
import TimersView from "./views/TimersView";
import LocalTime from "./context/LocalTime";
import AppProvider, { AppContext } from "./context/ContextProvider";
import {DropdownTime, DropdownRounds} from "./components/generic/Dropdown";
import Button from "./components/generic/Button";
import Panel from "./components/generic/Panel";
import DisplayTime  from "./components/generic/DisplayTime";
import Textbox  from "./components/generic/Textbox";

import { convertToMinSec } from "./utils/helpers";
import { useNavigate} from "react-router-dom";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;
const myStyle = {
  listStyleType: "none"
}
const QueueStyle = {
  fontSize: "14px"
}
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Body = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  width: 800px;
  text-align: center;
  background-color: lightgrey;
  border-radius: 3%;
`;

const Nav = () => {
  //idea from https://medium.com/how-to-react/add-an-active-classname-to-the-link-using-react-router-b7c350473916
  
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const {pathname} = location;

    //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <nav>                     
      <ul style={myStyle}>
        <li className={(splitLocation[1] === '' ? 'active':'')}>
          <Link to="/">Home</Link>
        </li>
        <li className={(splitLocation[1] === 'add' ? 'active':'')}>
          <Link to="/add">Add</Link>
        </li>
        <li className={(splitLocation[1] === 'timers' ? 'active':'')}>
          <Link to="/timers">Timers</Link>
        </li>
        <li className={(splitLocation[1] === 'docs' ? 'active':'')}>
          <Link to="/docs">Documentation</Link>
        </li>
        <li className={(splitLocation[1] === 'history' ? 'active':'')}>
          <Link to="/history">History</Link>
        </li>

      </ul>
    </nav>
  );
};

const LoadOnceFromQueryString = () => {
  
    const {setQueue} = useContext(AppContext);
    const queryParams = new URLSearchParams(window.location.search);
    let newQueue = [];
    if(queryParams.has('t0')||(queryParams.has('t1')||(queryParams.has('t2')))){

      let d0 = queryParams.has("d0") ? parseInt(queryParams.get("d0"), 0) : 0;
      let t0 = queryParams.get("t0");
      let r0 = queryParams.has("r0") ? parseInt(queryParams.get("r0"), 0) : 0;

      let d1 = queryParams.has("d1") ? parseInt(queryParams.get("d1"), 0) : 0;
      let t1 = queryParams.get("t1");
      let r1 = queryParams.has("r1") ? parseInt(queryParams.get("r1"), 0) : 0;

      let d2 = queryParams.has("d2") ? parseInt(queryParams.get("d2"), 0) : 0;
      let t2 = queryParams.get("t2");
      let r2 = queryParams.has("r2") ? parseInt(queryParams.get("r2"), 0) : 0;

      if(t0 !== null) newQueue.push({duration: d0, type: t0, rounds: r0});
      if(t1 !== null) newQueue.push({duration: d1, type: t1, rounds: r1});
      if(t2 !== null) newQueue.push({duration: d2, type: t2, rounds: r2});
    }

    //load once only, if from QueryString
    useEffect(() => {
      if(newQueue.length > 0) setQueue(newQueue);
       // eslint-disable-next-line 
    }, []); 
  
  return null
}


const Timer = LocalTime;

const Inner = (props) => {
  
  const initialSeconds = 5;
  const isHome = props.isHome;

  const {queue, addItem, paused, setPaused, reset, clear, progressTime} = useContext(AppContext);
  const [secondsStopwatch, setSecondsStopwatch] = useState(initialSeconds);
  const [secondsCountdown, setSecondsCountdown] = useState(initialSeconds);
  const [roundsXY, setRoundsXY] = useState(1);
  const [secondsXY, setSecondsXY] = useState(initialSeconds);
  const [roundsTabata, setRoundsTabata] = useState(1);
  const [secondsTabata, setSecondsTabata] = useState(initialSeconds);
 
  const [descStopwatch, setDescStopwatch] = useState('');
  const [descCountdown, setDescCountdown] = useState('');
  const [descXY, setDescXY] = useState('');
  const [descTabata, setDescTabata] = useState('');
  
  const navigate = useNavigate();
  
  let link = <Link to="/">Home</Link>;
  if(isHome === 'yes') {
    link = <Link to="/add">Add</Link>;
  }

  function ShowTotalDuration(){
    //add all the duration from queue array
    const totalDuration = queue.reduce((accumulator, object) => {
      return parseInt(accumulator) + parseInt(object.duration);
    },0);

    return(
      <Panel className="output">
            <DisplayTime label="Total Time:" time={convertToMinSec(totalDuration)}/>
            <DisplayTime label="Seconds Lapsed:" time={convertToMinSec(progressTime)}/>
      </Panel>
    )
  }

 
  function SetQueryString(){
    //grab queue and turn into querystring
    let qs = '?q=';
    for(let i in queue){
      if(i < 3){
        qs += '&d'+i+'='+queue[i].duration;
        qs += '&t'+i+'='+queue[i].type;
        qs += '&desc'+i+'='+encodeURIComponent(queue[i].desc);
        if(queue[i].rounds) qs += '&r'+i+'='+queue[i].rounds;
      }
    }
    console.log("QS is", qs);
    navigate(qs);  //set the URL
  }
 

  return (
    <div>
    
    <p>{link}</p>
    <hr/>
     
    <Panel className={`timer-selection-container ${(isHome === 'yes')?'hidden':''}`}
>

     <Panel> 
       Stopwatch <DropdownTime id="selectStopwatch" value={secondsStopwatch} onChange={(e) => {
         setSecondsStopwatch(e.target.value);
       } } />
       <div>
         <Textbox placeholder="Enter a description" className="stopwatchTextbox" id="stopwatchTextbox" maxLength="100" value={descStopwatch} onChange={e => setDescStopwatch(e.target.value)}/>
         
         <Button text="Add"
           onClick={() => {
             addItem({
               duration: secondsStopwatch,
               type: 'Stopwatch',
               desc: descStopwatch
             });
           } }
         >
         </Button>
       </div>
     </Panel>

     <hr/>

     <Panel>
       Countdown <DropdownTime id="selectCountdown" value={secondsCountdown} onChange={(e) => {
         setSecondsCountdown(e.target.value);
       } } />
       <div>
       Description:&nbsp;<Textbox placeholder="Enter a description" className="countdownTextbox" id="countdownTextbox" maxLength="100" value={descCountdown} onChange={e => setDescCountdown(e.target.value)}/>

         <Button text="Add"
           onClick={() => {
             addItem({
               duration: secondsCountdown,
               type: 'Countdown',
               desc: descCountdown
             });
           } }
         >
         </Button>
       </div>
     </Panel>

     <hr/>

     <Panel>
       XY <DropdownRounds id="selectXYRounds" value={roundsXY} onChange={(e) => {
         setRoundsXY(e.target.value);
       } } />
       &nbsp;@&nbsp;
       <DropdownTime id="selectXY" value={secondsXY} onChange={(e) => {
         setSecondsXY(e.target.value);
       } } />  each
       <div>
       <Textbox placeholder="Enter a description" className="XYTextbox" id="XYTextbox" maxLength="100" value={descXY} onChange={e => setDescXY(e.target.value)}/>

       <Button text="Add"
         onClick={() => {
           addItem({
             duration: secondsXY * roundsXY,
             type: 'XY',
             rounds: roundsXY,
             desc: descXY
           });
         } }
       >
       </Button>
       </div>
     </Panel>

     <hr/>

     <Panel>
       Tabata <DropdownRounds id="selectTabataRounds" value={roundsTabata} onChange={(e) => {
         setRoundsTabata(e.target.value);
       } } />
       &nbsp;@&nbsp;
       <DropdownTime id="selectTabata" value={secondsTabata} onChange={(e) => {
         setSecondsTabata(e.target.value);
       } } />  each
       <div>
       <Textbox placeholder="Enter a description" className="tabataTextbox" id="tabataTextbox" maxLength="100" value={descTabata} onChange={e => setDescTabata(e.target.value)}/>
       <Button text="Add"
         onClick={() => {
           addItem({
             duration: secondsTabata * roundsTabata,
             type: 'Tabata',
             rounds: roundsTabata,
             desc: descTabata
           });
         } }
       >
       </Button>
       </div>

       <hr/>

     </Panel>


    </Panel>


        <ShowTotalDuration/>

        {/* Show Queue*/}
        <Button onClick={() => {
              setPaused(!paused);
            } } 
            text={paused ? "Start" : "Pause"}
            type={paused ? "play" : "pause"}
            disabled={(queue.length < 1)}
        />

        <Button onClick={reset} type="stop" text="End" disabled={(queue.length < 1)}/>

        <Button onClick={clear} type="reset" text="Reset" disabled={(queue.length < 1)}/>

        <Button onClick={() => SetQueryString()} text="Update URL"/>

        <div className="queue" style={QueueStyle}>
          {queue.map((t, i) => (
            <Timer key={i} index={i} duration={t.duration} rounds={t.rounds} type={t.type} desc={t.desc} isHome={isHome}/>
          ))}
        </div>  

    </div>
  );
};

const App = () => {
  return (
    <AppProvider>

    <LoadOnceFromQueryString/>

    <Container>
      <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<BodyContainer><Body><Inner isHome='yes'/></Body></BodyContainer>} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/timers" element={<TimersView />} />
          <Route path="/add" element={<BodyContainer><Body><Inner isHome='no'/></Body></BodyContainer>} />
          <Route path="/history" element={<BodyContainer><Body><HistoryView/></Body></BodyContainer>} />
        </Routes>
      </Router>
    </Container>
    </AppProvider>
  );
};

export default App;
