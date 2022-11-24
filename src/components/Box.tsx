import { FC, ReactNode, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export interface SquareProps {
  children?: ReactNode;
}

const SIZE = "60px";

interface Props {
  itemVal: number;
  onDropped?: (source: number, target: number) => void | undefined;
}

export default function Box({ itemVal, onDropped }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "BOX",
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { itemVal },
      end: (item, monitor) => {
        // console.log("source", itemVal);
      },
    }),
    [itemVal]
  );

  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "BOX",
    // Props to collect
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
      onDropped?.(item.itemVal, itemVal);
    },
  }));

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
