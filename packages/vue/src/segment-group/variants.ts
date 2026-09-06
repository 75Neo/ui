import { inject, type InjectionKey } from "vue";
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

export const segmentGroupVariantsKey: InjectionKey<SegmentGroupVariants> =
  Symbol("segment-group-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSegmentGroupVariants(): SegmentGroupVariants {
  return inject(segmentGroupVariantsKey, segmentGroupDefaults);
}
