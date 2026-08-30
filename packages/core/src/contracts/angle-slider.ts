import type { angleSlider } from "@75neo/styles";
import type { AssertSlots, SlotClass } from "../types";

/** Lookup key for `<Theme ui>` overrides and `useComponentUI`. */
export const angleSliderKey = "angle-slider";

export type AngleSliderSlot = AssertSlots<
  "root" | "label" | "control" | "thumb" | "markerGroup" | "marker" | "valueText",
  keyof ReturnType<typeof angleSlider>
>;

export type AngleSliderUI = Partial<Record<AngleSliderSlot, SlotClass>>;

export const ANGLE_SLIDER_DEFAULT_MARKERS = [0, 45, 90, 135, 180, 225, 270, 315];
