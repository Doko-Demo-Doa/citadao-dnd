import { ReactNode } from "react";
import Box from "./Box";

export interface SquareProps {
  children?: ReactNode;
}

interface Props {
  itemVal: number;
}

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

export default function Square({ itemVal, idx, onDropped }: Props) {
  return (
    <div
      style={{
        position: "relative",
        transition: "0.2s linear all",
      }}
    >
      <Box
        idx={idx}
        itemVal={itemVal}
        onDropped={(source, target, sourceVal, targetVal) => {
          onDropped?.(source, target, sourceVal, targetVal);
        }}
      />
    </div>
  );
}
