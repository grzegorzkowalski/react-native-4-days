'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from "react";

// const Child = memo(({name} : {name: string}) => {
//   const count = useRef(0);

//   useEffect(() => {
//     count.current += 1;
//     console.log("Rendred", count.current);
//   })

//   return <h1>I'm a child, and my name is {name}</h1>;
// }, (prevProps, nextProps) => {
//   return prevProps.name === nextProps.name;
// });

const Child = ({ name }: { name: string }) => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log("Rendred", count.current);
  });

  return <h1>I'm a child, and my name is {name}</h1>;
};

const Parent = ({children} : {children: React.ReactNode} ) => {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState("Marcin");

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <>
      {children}

      <h2>{time.toLocaleTimeString()}</h2>
      <button onClick={() => setName("Adam Małysz")}>Click change name</button>
    </>
  );
};

const D = () => {
  return (
    <Parent>
      <Child name="Marcin" />
    </Parent>
  );  
};

export default D;
