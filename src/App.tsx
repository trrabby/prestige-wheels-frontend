import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { decrement, increment, incrementByAmount } from "./redux/features/counter/counterSlice";

function App() {

 const count = useAppSelector((state)=>state.counter.value);
 const despatch = useAppDispatch()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      count is {count}<br />
        <button onClick={() => despatch(increment())}>
          incriment by 1
        </button><br />
        <button onClick={() => despatch(decrement())}>
        Decrement by 1
        </button><br />
        <button onClick={() => despatch(incrementByAmount(5))}>
        Increment by 5
        </button><br />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
