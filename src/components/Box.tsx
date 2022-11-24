import { ReactNode, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export interface SquareProps {
  children?: ReactNode;
}

const SIZE = "60px";

interface Props {
  idx: [number, number];
  itemVal: number;
  onDropped?: (
    source: [number, number],
    target: [number, number],
    sourceVal: number,
    targetVal: number
  ) => void | undefined;
}

export default function Box({ itemVal, idx, onDropped }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "BOX",
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { itemVal, idx },
    }),
    [idx]
  );

  const [{ canDrop, isOver, item }, drop] = useDrop(
    () => ({
      accept: "BOX",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
      }),
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
      },
      drop(item: any, monitor) {
        // Source, target
        onDropped?.(item.idx, idx, item.itemVal, itemVal);
      },
    }),
    [idx]
  );

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        width: SIZE,
        height: SIZE,
        margin: "1rem",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {itemVal}
    </div>
  );
}
