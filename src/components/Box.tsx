import type { FC, ReactNode } from "react";
import { useDrag } from "react-dnd";

export interface SquareProps {
  children?: ReactNode;
}

const SIZE = "60px";

interface Props {
  itemKey: number;
  itemVal: number;
}

export default function Box({ itemKey, itemVal }: Props) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragPreview}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: SIZE,
        height: SIZE,
        margin: "1rem",

        backgroundColor: "blue",
      }}
    >
      {/* The drag ref marks this node as being the "pick-up" node */}
      <div
        role="Handle"
        ref={drag}
        style={{
          width: SIZE,
          height: SIZE,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {itemVal}
      </div>
    </div>
  );
}
