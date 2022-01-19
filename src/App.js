import FrameCollection from "./FrameCollection/FrameCollection";
import "./App.css";

import { useState } from "react";

function App() {
  const [finished, setfinished] = useState(false);
  var className;
  if (finished) {
    className = "app hide";
  } else {
    className = "app";
  }
  return (
    <div className={className}>
      <div className="back"></div>
      <div className="text">
        <span>I</span>
        <span> 24.8352° N, 55.4034° E</span>
        <span> U</span>
      </div>
      <FrameCollection setfinished={setfinished} />
    </div>
  );
}

export default App;
