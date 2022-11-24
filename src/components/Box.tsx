import { FC, ReactNode, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export interface SquareProps {
  children?: ReactNode;
}

const SIZE = "60px";

interface Props {
  itemKey: number;
  itemVal: number;
}

export default function Box({ itemKey, itemVal }: Props) {
  const [boxKey, setBoxKey] = useState(itemKey);
  const [boxVal, setBoxVal] = useState(itemVal);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "BOX",
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { boxKey, boxVal, isSource: true },
      end: (item, monitor) => {
        // console.log(item, monitor.getItem());
        if (!monitor.getItem().isSource) {
          setBoxKey(monitor.getItem().boxKey);
          setBoxVal(monitor.getItem().boxVal);
        }
      },
    }),
    [boxKey]
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
    drop: (item, monitor) => {
      if (item.isSource) {
        setBoxKey(item.boxKey);
        setBoxVal(item.boxVal);
      }
    },
  }));

  console.log({ itemKey, itemVal });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? "red" : undefined }}>
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
          {boxVal}
        </div>
      </div>
    </div>
  );
}
