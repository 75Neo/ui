import type { carousel } from "@75neo/styles";
import type { AssertSlots, SlotClass } from "../types";

/** Lookup key for `<Theme ui>` overrides and `useComponentUI`. */
export const carouselKey = "carousel";

export type CarouselSlot = AssertSlots<
  | "root"
  | "viewport"
  | "container"
  | "item"
  | "controls"
  | "arrows"
  | "prev"
  | "next"
  | "dots"
  | "dot",
  keyof ReturnType<typeof carousel>
>;

export type CarouselUI = Partial<Record<CarouselSlot, SlotClass>>;

/**
 * One entry of the `items` prop.
 *
 * `Node` is the framework's renderable-content type: React instantiates it with
 * `ReactNode`, Vue with `string`. Richer per-item content in Vue goes through the
 * `item` scoped slot instead.
 */
export type CarouselItemData<Node = string> = {
  content?: Node;
  class?: string;
  ui?: Partial<Record<"item", SlotClass>>;
};

/** Accepts a bare string or number as shorthand for `{ content }`. */
export function normalizeCarouselItems<Node>(
  items?: (CarouselItemData<Node> | string | number)[],
): CarouselItemData<Node>[] {
  if (!items?.length) return [];
  return items.map((item) =>
    typeof item === "string" || typeof item === "number"
      ? ({ content: String(item) } as CarouselItemData<Node>)
      : item,
  );
}
