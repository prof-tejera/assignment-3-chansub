import React, {useEffect, useContext, useState} from "react";

import styled from "styled-components";

import LocalTime from "../context/LocalTime";
import AppProvider, {AppContext}  from "../context/ContextProvider";
import Dropdown from "../components/generic/Dropdown";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Body = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  width: 500px;
  text-align: center;
  background-color: lightgrey;
  border-radius: 3%;
`;

const Timer = LocalTime;

const AddView = () => {

  const { queue, addItem, setQueue, paused, setPaused, message, setMessage } = useContext(AppContext);

  const handleAdd = (q) => {
    const qItem = q;
    console.log("handleAdd called", q);
    //setQueue((q) => [...q])
    setMessage('hey there q.duration is ', qItem);
  }

  useEffect(() => {
    document.title = "Susana T. - Assignment 2 - Timers";  
  }, []);

  return (
    
    <Container>
        <Body>
            <div>
                <p>Select the seconds for each one, click on "Add to queue" button</p>
                <div>
                    Stopwatch <Dropdown ddID="stopwatchSecs"/> Seconds 
                    <button
                      onClick={() => {
                        handleAdd({
                          duration: 5
                        });
                      }}
                    >
                      Add
                    </button>

                    <button
                      onClick={() => {
                        addItem({
                          duration: Math.floor(Math.random() * 10) + 3
                        });
                      }}
                    >
                      ADD2
                    </button>
                
                </div>
                <div>
                  Countdown <Dropdown ddID="countdownSecs"/> Seconds
                
                    <button
                      onClick={() => {
                        handleAdd({
                          duration: 5
                        });
                      }}
                    >
                      Add
                    </button>


                    <button
                      onClick={() => {
                        addItem({
                          duration: Math.floor(Math.random() * 10) + 3
                        });
                      }}
                    >
                      ADD2
                    </button>
                
                </div>
            </div>
      
            <div className="queue">Queue? {queue}</div>
            <div className="message">Message? {message}</div>
      
        </Body>
    </Container>
   
  );
};

export default AddView;
