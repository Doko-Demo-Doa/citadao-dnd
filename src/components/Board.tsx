import Box from "./Box";
import Square from "./Square";

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

function Board() {
  return (
    <>
      {finalArr.map((n, idx) => (
        <div key={idx} style={{ display: "flex", position: "relative" }}>
          {n.vert.map((n2, idx2) => (
            <Square
              key={idx2}
              itemKey={n2.verticalVal + (idx + 1) * 8 - 8}
              itemVal={n2.verticalVal + (idx + 1) * 8 - 8}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;
