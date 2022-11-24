import { FC, ReactNode, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Box from "./Box";

export interface SquareProps {
  children?: ReactNode;
}

const SIZE = "60px";

interface Props {
  itemKey: number;
  itemVal: number;
}

export default function Square({ itemKey, itemVal }: Props) {
  const [boxVal, setBoxVal] = useState(itemVal);
  const [dropTargetVal, setDropTargetVal] = useState(itemKey);

  return (
    <div
      style={{
        position: "relative",
        transition: "0.2s linear all",
      }}
    >
      <Box
        itemVal={boxVal}
        onDropped={(newV) => {
          console.log(newV);
        }}
      />
    </div>
  );
}
