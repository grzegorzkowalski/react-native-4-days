import React, { useDeferredValue, useEffect, useState, useTransition } from "react";
import times from "lodash/times";
// npm install lodash && npm install --save-dev @types/lodash 

type Props = {};

const usedeferredvalue: React.FC<Props> = ({}): JSX.Element => {
  const [input, setInput] = useState<number | "">(0);
  const [deferredValue, setDefferedInput] = useState<number | "">(0);
  const [isPending, startTransition] = useTransition();
  // const deferredValue = useDeferredValue(input);


  useEffect(() => {
    if (input !== "") {
      startTransition(() => {
        setDefferedInput(input);
      });
    }
  }, [input])

  const generateElements = (number) => {
    return times(number, (num) => {
      return <li key={num}>{num}</li>;
    });
  };

  return (
    <section>
      <input
        type="number"
        value={input}
        onChange={(e) =>
          setInput(
            e.currentTarget.value === "" ? "" : Number(e.currentTarget.value)
          )
        }
      ></input>
      { isPending ? <p>Loading...</p> : <ul>{generateElements(deferredValue)}</ul> }
    </section>
  );
};

export default usedeferredvalue;
