import React from "react";

const DisplayRounds = (props) => {
    return (
        <><span>{props.label ? props.label : ''}</span><span className="numbers rounds">{props.rounds}</span></>
    );
};

export default DisplayRounds;
