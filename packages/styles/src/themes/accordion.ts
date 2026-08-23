import { tv } from "../tv";

/**
 * One theme, three frameworks. React, Vue and Svelte all render the class names this
 * produces, so accordion styling only ever changes here.
 *
 * Dividers and nothing else: one size, `disabled` as its only variant. There is
 * deliberately no `size`, `variant` or `color` axis — an accordion in this system is a
 * list of rows in a page, and the page is what supplies the box around it. Anything more
 * is a `ui` prop or a `ThemeConfig` away.
 *
 * Two structural notes:
 *
 * - **There is no `header` slot.** Ark's trigger is already the item's direct child, so
 *   `trigger` carries `w-full` to fill the item and nothing sits between the two.
 * - **`body` is not optional.** The open/close animation interpolates `height`, and with
 *   `box-sizing: border-box` an element cannot be shorter than its own vertical padding
 *   — so `content` is the bare animated box and `body`, one level in, carries the
 *   padding. The framework bindings render that wrapper themselves, so callers never
 *   have to know.
 *
 * The keyframes in `css/tokens.css` read `--height`, the property Ark measures the panel
 * into.
 *
 * Styled for Ark's default vertical orientation. `orientation="horizontal"` is a
 * different layout *and* a different animation (`--width`, sideways text) and is not
 * covered here.
 */
export const accordion = tv({
  slots: {
    root: "w-full",

    item: "border-b border-default last:border-b-0",

    trigger: [
      // `group` is what lets `trailingIcon` react to the trigger's own `data-state`.
      "group flex w-full min-w-0 items-center gap-1.5",
      "py-3.5 text-sm font-medium",
      // The focus ring is per-component in this system, not global — a wide, translucent
      // halo. An accordion has no colour axis, so it names `primary` outright.
      "rounded-md outline-primary/25 focus-visible:outline-3",
    ],

    leadingIcon: "size-5 shrink-0",

    label: "break-words text-start",

    trailingIcon: [
      "size-5 shrink-0",
      // `ms-auto` is what pushes the chevron to the end of the trigger.
      "ms-auto group-data-[state=open]:rotate-180",
      "transition-transform duration-200 ease-out motion-reduce:transition-none",
    ],

    content: [
      // The keyframes interpolate `height` between `0` and the `--height` Ark measures
      // onto this element; `overflow-hidden` while closing is what keeps the body from
      // spilling out as it collapses.
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      "data-[state=closed]:overflow-hidden focus:outline-none",
    ],

    body: "pb-3.5 text-sm",
  },

  variants: {
    /**
     * Applied per row rather than per accordion — the components pass each item's own
     * `disabled` when they call the `trigger` slot function.
     */
    disabled: {
      true: {
        trigger: "cursor-not-allowed opacity-75",
      },
    },
  },
});
