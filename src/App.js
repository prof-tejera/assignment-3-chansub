import React, {useContext, useState} from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";

import LocalTime from "./context/LocalTime";
import AppProvider, { AppContext } from "./context/ContextProvider";
import {DropdownTime, DropdownRounds} from "./components/generic/Dropdown";
import Button from "./components/generic/Button";
import Panel from "./components/generic/Panel";
import DisplayTime  from "./components/generic/DisplayTime.js";
import { convertToMinSec } from "./utils/helpers";

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
  width: 500px;
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

      </ul>
    </nav>
  );
};

const Timer = LocalTime;

const Inner = (props) => {
  
  let initialSeconds = 5;
  const isHome = props.isHome;

  const { queue, addItem, paused, setPaused, reset, clear } = useContext(AppContext);
  const [secondsStopwatch, setSecondsStopwatch] = useState(initialSeconds);
  const [secondsCountdown, setSecondsCountdown] = useState(initialSeconds);
  
  const [roundsXY, setRoundsXY] = useState(1);
  const [secondsXY, setSecondsXY] = useState(initialSeconds);
  const [roundsTabata, setRoundsTabata] = useState(1);
  const [secondsTabata, setSecondsTabata] = useState(initialSeconds);

  function ShowSelections(){
    if(isHome === 'yes'){
      return <Link to="/add">Add</Link>
    }
    if(isHome === 'no'){

    return(
      <>
      <Link to="/">Home</Link>
     
        <Panel> 
          Stopwatch <DropdownTime id="selectStopwatch" value={secondsStopwatch} onChange={(e) => {
            setSecondsStopwatch(e.target.value);
          } } />
          <Button text="Add"
            onClick={() => {
              addItem({
                duration: secondsStopwatch,
                type: 'Stopwatch'
              });
            } }
          >
          </Button>
        </Panel>
      
        <Panel>
          Countdown <DropdownTime id="selectCountdown" value={secondsCountdown} onChange={(e) => {
            setSecondsCountdown(e.target.value);
          } } />
          <Button text="Add"
            onClick={() => {
              addItem({
                duration: secondsCountdown,
                type: 'Countdown'
              });
            } }
          >
          </Button>
        </Panel>

        <Panel>
          XY <DropdownRounds id="selectXYRounds" value={roundsXY} onChange={(e) => {
            setRoundsXY(e.target.value);
          } } />
          &nbsp;@&nbsp;
          <DropdownTime id="selectXY" value={secondsXY} onChange={(e) => {
            setSecondsXY(e.target.value);
          } } />  each
          <Button text="Add"
            onClick={() => {
              addItem({
                duration: secondsXY * roundsXY,
                type: 'XY',
                rounds: roundsXY
              });
            } }
          >
          </Button>
        </Panel>

        <Panel>
          Tabata <DropdownRounds id="selectTabataRounds" value={roundsTabata} onChange={(e) => {
            setRoundsTabata(e.target.value);
          } } />
          &nbsp;@&nbsp;
          <DropdownTime id="selectTabata" value={secondsTabata} onChange={(e) => {
            setSecondsTabata(e.target.value);
          } } />  each
          <Button text="Add"
            onClick={() => {
              addItem({
                duration: secondsTabata * roundsTabata,
                type: 'Tabata',
                rounds: roundsTabata
              });
            } }
          >
          </Button>

        </Panel></>
    )
    }
  }

  function ShowTotalDuration(){
    const totalDuration = queue.reduce((accumulator, object) => {
      return parseInt(accumulator) + parseInt(object.duration);
    },0);

    return(
      <Panel className="output">
            <DisplayTime label="Total Time:" time={convertToMinSec(totalDuration)}/>
      </Panel>
    )
  }

  return (
    <div>
        
        <ShowSelections/>

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

        <div className="queue" style={QueueStyle}>
          {queue.map((t, i) => (
            <Timer key={i} index={i} duration={t.duration} rounds={t.rounds} type={t.type} isHome={isHome}/>
          ))}
        </div>  

    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
    <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<BodyContainer><Body><Inner isHome='yes'/></Body></BodyContainer>} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/timers" element={<TimersView />} />
          <Route path="/add" element={<BodyContainer><Body><Inner isHome='no'/></Body></BodyContainer>} />
        </Routes>
      </Router>
    </Container>
    </AppProvider>
  );
};

export default App;
