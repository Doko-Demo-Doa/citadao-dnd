import { useState } from "react";
import Square from "./Square";

const SIZE = 8;

const arr = Array(SIZE)
  .fill(2)
  .map((_, i) => ({}));

const finalArr = arr.map((n, idx) =>
  Array(SIZE)
    .fill(2)
    .map((_, i) => i + 1 + (idx + 1) * SIZE - SIZE)
);

function Board() {
  const [arr, setArr] = useState(finalArr);

  return (
    <>
      {finalArr.map((n, idx) => (
        <div key={idx} style={{ display: "flex", position: "relative" }}>
          {n.map((n2, idx2) => (
            <Square
              idx={[idx2, idx]}
              key={idx2}
              itemVal={n2}
              onDropped={(source, target, sourceVal, targetVal) => {
                let newArr = [...arr];
                newArr[source[1]][source[0]] = targetVal;
                newArr[target[1]][target[0]] = sourceVal;

                setArr(newArr);
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;
