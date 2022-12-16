import React, {useEffect} from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";




const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  width: 320px;
  text-align: center;
  background-color: #D2D2D2;
  border-radius: 3%;
`;

const TimerTitle = styled.div``;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch />},
    { title: "Countdown", C: <Countdown />}, 
       { title: "XY", C: <XY />},
    { title: "Tabata", C: <Tabata />},
  ];

  useEffect(() => {
    document.title = "Susana T. - Assignment 2 - Timers";  
  }, []);

  return (
    
      <Timers>
        {timers.map((timer) => (
          <Timer key={`timer-${timer.title}`}>
            <TimerTitle>{timer.title}</TimerTitle>
            {timer.C}
            {timer.b}
            {timer.be}
          </Timer>
        ))}
      </Timers>
    
  );
};

export default TimersView;
