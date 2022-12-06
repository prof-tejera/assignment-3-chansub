import React from "react";

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
        <option value="135">02:15</option>
        <option value="150">02:30</option>
        <option value="165">02:45</option>
        <option value="180">03:00</option>
        <option value="195">03:15</option>
        <option value="210">03:30</option>
        <option value="225">03:45</option>
        <option value="240">04:00</option>
        <option value="255">04:15</option>
        <option value="270">04:30</option>
        <option value="285">04:45</option>
        <option value="300">05:00</option>
    </select>
  )
};



