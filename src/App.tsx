import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import Bucket from "./components/Bucket";
import Box from "./components/Box";
import Board from "./components/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
