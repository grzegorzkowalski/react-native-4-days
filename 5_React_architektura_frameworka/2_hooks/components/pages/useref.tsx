import React, { useEffect, useRef } from "react";
import $ from "jquery";

const style = {
  width: "100%",
  height: "100vh",
  backgroundColor: "red",
  position: "relative",
};

const Useref: React.FC = (): JSX.Element => {
  const ref = useRef(null);
  const [color, setColor] = React.useState("red");


  let counter = useRef({ number: 0});

  console.log("render", counter);

  useEffect(() => {

    console.log(ref.current);

    $(ref.current).animate({position: 'absolute', width: "100px", height: "100px", left: 100, top: 100 }, 1000);
  }, [])


 

  return <div
  
  onClick = {
    () => {
      ref.current.style.backgroundColor = "blue";
  }}
  ref={(r) => { 
    console.log("ref", r);
    console.log("check if equal", r === ref.current);
    if(true) ref.current = r } } style={style}>
    <button onClick={() => {
      counter.current.number++;
        console.log("render inside event", counter);
    }}>Click</button>
    <button onClick={() => {
      setColor(prev => prev === "blue" ? "red" : "blue" );
    }}>Change color</button>


    <input type="text" onChange={(e) => {
      console.log(e);
    }} />
  </div>;
};

export default Useref;
