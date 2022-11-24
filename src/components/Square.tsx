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

interface ItemType {
  boxKey: number;
  boxVal: number;
}

export default function Square({ itemKey, itemVal }: Props) {
  const [boxKey, setBoxKey] = useState(itemKey);
  const [boxVal, setBoxVal] = useState(itemVal);

  const [squareKey, setSquareKey] = useState(itemKey);
  const [squareVal, setSquareVal] = useState(itemVal);

  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "BOX",
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop(item, monitor) {
      console.log("item", item);
      console.log("tar", boxVal);

      setBoxKey(item.boxKey);
      setBoxVal(item.boxVal);
    },
  }));

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? "red" : undefined }}>
      <Box itemKey={boxKey} itemVal={boxVal} />
    </div>
  );
}
