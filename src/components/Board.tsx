import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Box from "./Box";
import Bucket from "./Bucket";

const SIZE = 8;

const arr = Array(SIZE)
  .fill(2)
  .map((_, i) => ({ horizontalKey: i + 1, horizontalVal: i + 1 }));

const finalArr = arr.map((n, idx) => ({
  ...n,
  vert: Array(SIZE)
    .fill(2)
    .map((_, i) => ({ verticalKey: n.horizontalKey + 1, verticalVal: i + 1 })),
}));

console.log(finalArr);

function Board() {
  const [count, setCount] = useState(0);

  return (
    <DndProvider backend={HTML5Backend}>
      <Bucket />

      {finalArr.map((n, idx) => (
        <div key={idx} style={{ display: "flex" }}>
          {n.vert.map((n2, idx2) => (
            <Box
              key={idx2}
              itemKey={n2.verticalVal + (idx + 1) * 8 - 8}
              itemVal={n2.verticalVal + (idx + 1) * 8 - 8}
            />
          ))}
        </div>
      ))}
    </DndProvider>
  );
}

export default Board;
