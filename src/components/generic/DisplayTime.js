import React from "react";
import "./DisplayTime.css";

const DisplayTime = (props) => {
  
    return (
        <><span className="timeLabel">{props.label ? props.label : ''}</span><span className="numbers">{props.time}</span></>
    );
};

export default DisplayTime;
