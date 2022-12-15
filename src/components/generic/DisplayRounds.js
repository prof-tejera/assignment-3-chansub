import React from "react";

const DisplayRounds = (props) => {
    return (
        <><span>{props.label ? props.label : ''}</span><span className="numbers rounds">{props.rounds}</span> {(props.rounds>1)?'rounds':'round'}</>
    );
};

export default DisplayRounds;
