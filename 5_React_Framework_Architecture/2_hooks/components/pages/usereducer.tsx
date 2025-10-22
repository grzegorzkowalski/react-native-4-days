import React, { useReducer } from "react";

function factorialize(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
}

const initialValue = 1;

const init = (val) => ({ result: val });

const Usereducer: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(
    (state: {result: number}, action) => {
      if (action.type === "FACTORIAL") {
        console.log(action);
        return { result: factorialize(state.result) };
      }

      if (action.type === "SQRT") {
        console.log(action);
        return { result: Math.sqrt(state.result) };
      }

      if (action.type === "ADD") {
        console.log(action);
        return { result: state.result + 1 };
      }

      if (action.type === "RESET") {
        console.log(action);
        return init(action.payload);
      }

      return state;
    },
    initialValue,
    init
  );

  return (
    <div>
      <h1>Result: {state.result}</h1>
      <button onClick={() => dispatch({ type: "FACTORIAL" })}>factorial</button>
      <button onClick={() => dispatch({ type: "ADD" })}>add</button>
      <button onClick={() => dispatch({ type: "FACTORIAL" })}>sqrt</button>
      <button
        onClick={() => dispatch({ type: "RESET", payload: initialValue })}
      >
        reset
      </button>
    </div>
  );
};

export default Usereducer;
