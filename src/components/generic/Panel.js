import "./Panel.css";

import React from "react";

const Panel = (props) => {
  return <div className={`panel ${props.className}`}>{props.children}</div>;
};




export default Panel;
