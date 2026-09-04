import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/** Which of the panel's window controls are drawn, in order. */
export type FloatingPanelStage = "minimized" | "maximized" | "default";

/** The panel's size in pixels, for `defaultSize`, `panelSize`, `minSize` and `maxSize`. */
export interface FloatingPanelSize {
  width: number;
  height: number;
}

/** The panel's position in pixels, for `defaultPosition` and `position`. */
export interface FloatingPanelPosition {
  x: number;
  y: number;
}

/** One of the eight resize handles around the panel's edge. */
export type FloatingPanelResizeAxis = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw";

/** Every resize handle the panel draws, one per edge and corner. */
export const floatingPanelResizeAxes: readonly FloatingPanelResizeAxis[] = [
  "n",
  "e",
  "s",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
];

/**
 * Recipe for the FloatingPanel: a non-modal window the caller drags and resizes.
 *
 * @remarks
 * It is the Dialog's anatomy cut loose from the page: the panel is `base` again,
 * with a header, a body and icon buttons, but there is no overlay and no positioner
 * pinning it to the viewport. The positioner covers the screen without catching
 * pointer events, so the page stays usable around the panel, and only `base` catches
 * them back.
 *
 * The header does double duty as the drag handle. Ark's `DragTrigger` wraps it, and
 * the grip icon rides the title the way the Switch's icons ride its thumb. The window
 * controls sit in `control`: one `stageTrigger` per entry in `stages`, then the close
 * button.
 *
 * All eight resize handles share the `resizeTrigger` slot and tell each other apart
 * off Ark's `data-axis`, because one slot string covers all of them and the adapter
 * stays a loop. Each handle sits just inside the panel's edge, since `base` hides its
 * overflow for its rounding and anything outside would clip.
 *
 * A minimized panel keeps its header and hides its body, which is what turns the
 * component into a docked window rather than a closed one. The body carries Ark's own
 * `data-minimized` for that, so no adapter state is involved.
 */
export const floatingPanel = tv({
  slots: {
    positioner: "pointer-events-none fixed inset-0 z-50",
    base: "pointer-events-auto relative flex max-h-[calc(100dvh-2rem)] min-h-0 flex-col overflow-hidden rounded-xl bg-default shadow-2xl ring ring-accented outline-none data-maximized:h-[calc(100dvh-2rem)] data-maximized:w-[calc(100dvw-2rem)] data-maximized:max-w-none",
    dragTrigger: "flex min-w-0 cursor-move touch-none select-none data-disabled:cursor-not-allowed",
    dragIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    header: "flex min-w-0 shrink-0 items-center gap-2 border-b border-muted",
    title: "flex min-w-0 flex-1 items-center gap-2 font-semibold text-highlighted",
    control: "ms-auto flex shrink-0 items-center gap-0.5 data-disabled:opacity-75",
    stageTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    closeTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    body: "min-h-0 flex-1 overflow-auto overscroll-contain text-toned data-minimized:hidden",
    resizeTrigger:
      "absolute z-10 touch-none select-none data-disabled:cursor-not-allowed data-[axis=e]:inset-y-3 data-[axis=e]:right-0 data-[axis=e]:w-1.5 data-[axis=e]:cursor-ew-resize data-[axis=n]:inset-x-3 data-[axis=n]:top-0 data-[axis=n]:h-1.5 data-[axis=n]:cursor-ns-resize data-[axis=ne]:top-0 data-[axis=ne]:right-0 data-[axis=ne]:size-3 data-[axis=ne]:cursor-nesw-resize data-[axis=nw]:top-0 data-[axis=nw]:left-0 data-[axis=nw]:size-3 data-[axis=nw]:cursor-nwse-resize data-[axis=s]:inset-x-3 data-[axis=s]:bottom-0 data-[axis=s]:h-1.5 data-[axis=s]:cursor-ns-resize data-[axis=se]:right-0 data-[axis=se]:bottom-0 data-[axis=se]:size-3 data-[axis=se]:cursor-nwse-resize data-[axis=sw]:bottom-0 data-[axis=sw]:left-0 data-[axis=sw]:size-3 data-[axis=sw]:cursor-nesw-resize data-[axis=w]:inset-y-3 data-[axis=w]:left-0 data-[axis=w]:w-1.5 data-[axis=w]:cursor-ew-resize",
  },
  variants: {
    size: {
      sm: {
        base: "w-72 max-w-[calc(100dvw-2rem)]",
        header: "px-3 py-2",
        title: "text-sm",
        dragIcon: "size-4",
        stageTrigger: "size-6 p-1",
        closeTrigger: "size-6 p-1",
        body: "px-3 py-2 text-sm/6",
      },
      md: {
        base: "w-96 max-w-[calc(100dvw-2rem)]",
        header: "px-4 py-3",
        title: "text-sm",
        dragIcon: "size-5",
        stageTrigger: "size-7 p-1.5",
        closeTrigger: "size-7 p-1.5",
        body: "px-4 py-3 text-sm/6",
      },
      lg: {
        base: "w-[32rem] max-w-[calc(100dvw-2rem)]",
        header: "px-5 py-4",
        title: "text-base",
        dragIcon: "size-5",
        stageTrigger: "size-8 p-1.5",
        closeTrigger: "size-8 p-1.5",
        body: "px-5 py-4 text-base/7",
      },
    },
    /** Off is for a caller who would rather animate the panel themselves. */
    transition: {
      true: {
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "md",
    transition: true,
  },
});

export type FloatingPanelVariants = VariantProps<typeof floatingPanel>;
export type FloatingPanelSlots = keyof ReturnType<typeof floatingPanel>;

export type FloatingPanelUI = TVSlot<FloatingPanelSlots>;

export type FloatingPanelTheme = ThemeOverride<FloatingPanelSlots, FloatingPanelVariants>;

/**
 * Everything a FloatingPanel accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The panel's size and position are plain objects rather than Ark types, because
 * Vue's `defineProps` cannot follow a type into a dependency's declaration files and
 * the contract is written out by hand for both frameworks at once.
 *
 * `size` the variant and the panel's size in pixels share a name everywhere but here:
 * the variant keeps `size`, and the controlled pixel size is `panelSize`, the
 * controlled counterpart of Ark's own `defaultSize`.
 *
 * The open state, the controlled position and the controlled size are not here:
 * React and Vue spell a controlled value too differently to share one type, so each
 * adapter takes them from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface FloatingPanelProps<F> {
  /** Per-slot class overrides. */
  ui?: FloatingPanelUI;
  size?: FloatingPanelVariants["size"];
  transition?: FloatingPanelVariants["transition"];
  /** Header title, beside the grip. */
  title?: string;
  /**
   * Which window controls are drawn, in order.
   * @defaultValue `["minimized", "maximized", "default"]`
   */
  stages?: FloatingPanelStage[];
  /** Show the close button in the header. @defaultValue `true` */
  close?: boolean;
  /** Replaces the close button's icon. */
  closeIcon?: F;
  /** The grip beside the title that hints the header drags. */
  dragIcon?: F;
  /** Replaces the minimize icon. */
  minimizeIcon?: F;
  /** Replaces the maximize icon. */
  maximizeIcon?: F;
  /** Replaces the restore icon. */
  restoreIcon?: F;
  /** Whether the header drags the panel. @defaultValue `true` */
  draggable?: boolean;
  /** Whether the edge handles resize the panel. @defaultValue `true` */
  resizable?: boolean;
  disabled?: boolean;
  /** Close the panel on Escape. */
  closeOnEscape?: boolean;
  /** `"absolute"` positions against the nearest positioned ancestor. @defaultValue `"fixed"` */
  strategy?: "absolute" | "fixed";
  /** Where the panel opens. */
  defaultPosition?: FloatingPanelPosition;
  /** The panel's uncontrolled starting size. */
  defaultSize?: FloatingPanelSize;
  /** The controlled size of the panel. Pairs with `defaultSize`. */
  panelSize?: FloatingPanelSize;
  /** The smallest the panel resizes to. */
  minSize?: FloatingPanelSize;
  /** The largest the panel resizes to. */
  maxSize?: FloatingPanelSize;
  /** Keep the panel's size and position across closing. */
  persistRect?: boolean;
  /** Move the panel to the end of the document. @defaultValue `true` */
  portal?: boolean;
  /** Keep the panel out of the DOM until it is opened for the first time. */
  lazyMount?: boolean;
  /** Remove the panel from the DOM once it has finished closing. */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type FloatingPanelVariantsAreExposed = MustBeNever<
  Exclude<keyof FloatingPanelVariants, keyof FloatingPanelProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    floatingPanel: ComponentContract<FloatingPanelSlots, FloatingPanelVariants>;
  }
}
