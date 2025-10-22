import React, { useEffect, useState } from "react";

const UseState: React.FC = (): JSX.Element => {
  let [color, setColor] = useState("pink");
  const [counter, setCounter] = useState(0);

  let clr = "red"


  useEffect(() => {
    setInterval(() => {
      setCounter((prev ) => prev + 1);
    }, 1000)
  }, [])

  return (
    <button
      style={{ padding: "30px", fontSize: "26px", backgroundColor: clr}}
      onClick={() => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // setColor(`#${randomColor}`)
        // color = `#${randomColor}`;
        console.log("I've cliked", randomColoru);
        // setCounter((prev) => prev + 1);

        clr = `#${randomColor}`;

      }}
    >
      Change color {counter} time
    </button>
  );
};

export default UseState;
