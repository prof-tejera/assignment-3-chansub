import React from "react";

const Dropdown = ({ddID, ...props}) => {

  //inspiration from: https://www.techiedelight.com/create-array-from-1-n-javascript/  
  const N = 30;
  const numbers60 = [...Array(N).keys()].map(x => ++x);
  
  return (
    <select id={props.id} key={ddID} {...props}>
        <option>0</option>
        {
            numbers60.map((n,index) => {
              return (<option key={index}>{n}</option>);
            })
        }
    </select>
  )
};
export default Dropdown;



export const DropdownRounds = ({ddID, ...props}) => {
  return (
    <select id={props.id} {...props}>
        <option value="1">1 round</option>
        <option value="2">2 rounds</option>
        <option value="3">3 rounds</option>
        <option value="4">4 rounds</option>
        <option value="5">5 rounds</option>
    </select>
  )
};


export const DropdownTime = ({ddID, ...props}) => {
  return (
    <select id={props.id} {...props}>
        <option value="5">00:05</option>
        <option value="10">00:10</option>
        <option value="15">00:15</option>
        <option value="30">00:30</option>
        <option value="45">00:45</option>
        <option value="60">01:00</option>
        <option value="75">01:15</option>
        <option value="90">01:30</option>
        <option value="105">01:45</option>
        <option value="120">02:00</option>
    </select>
  )
};



