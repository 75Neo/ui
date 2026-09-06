import { createContext, useContext } from "react";
import {
  segmentGroupDefaults,
  type SegmentGroupColor,
  type SegmentGroupOrientation,
  type SegmentGroupSize,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface SegmentGroupVariants {
  color: SegmentGroupColor;
  size: SegmentGroupSize;
  orientation: SegmentGroupOrientation;
}

const SegmentGroupVariantsContext = createContext<SegmentGroupVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSegmentGroupVariants(): SegmentGroupVariants {
  return useContext(SegmentGroupVariantsContext) ?? segmentGroupDefaults;
}

export { SegmentGroupVariantsContext };
