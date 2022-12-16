import React from "react";

const Textbox = ({...props}) => {
  return <input type="text" {...props}>{props.children}</input>;
};
export default Textbox;
