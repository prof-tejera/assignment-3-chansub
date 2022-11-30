import { useContext } from "react";

import LocalTime from "./context/LocalTime";
import AppProvider, { AppContext } from "./context/ContextProvider";

const Timer = LocalTime;

const Inner = () => {
  const { queue, addItem, paused, setPaused, reset } = useContext(AppContext);
  return (
    <div>
      <button
        onClick={() => {
          addItem({
            duration: 5
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setPaused(!paused);
        }}
      >
        {paused ? "Run" : "Pause"}
      </button>
      <button onClick={reset}>Reset</button>
      <div className="queue">
        {queue.map((t, i) => (
          <Timer key={i} index={i} duration={t.duration} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  );
};

export default App;
