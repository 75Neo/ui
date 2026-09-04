import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the TreeView: a file tree of branches and leaves.
 *
 * @remarks
 * Branches and leaves share one row look. A branch's control and a leaf's item are
 * different Ark parts, but the reader sees rows in a tree, so both resolve from the
 * same classes and `data-selected` paints either one.
 *
 * Every part here is a `div`, so disabled is styled with `data-disabled`. The one
 * exception nobody should go looking for is the rename input, which this component
 * does not render.
 *
 * Depth comes from Ark, not from the adapters. Ark writes `--depth` on each item and
 * branch control, and the rows indent themselves off it, so nesting needs no variant
 * and no per-level class.
 *
 * The indent guide is a border on the branch content rather than Ark's guide part. A
 * border on the content is one continuous line whatever the depth, needs no measuring,
 * and disappears with the `indentGuide` variant.
 *
 * Selected is not a variant. Ark writes `data-selected` on the row, so one resolved
 * class string covers both states — the same reason pressed is not one on the
 * Toggle.
 */
export const treeView = tv({
  slots: {
    base: "flex min-w-0 flex-col gap-1",
    label: "px-2 text-xs font-semibold text-dimmed",
    tree: "flex min-w-0 flex-col gap-px outline-none",
    branch: "flex min-w-0 flex-col",
    branchControl:
      "flex w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 ps-[calc(var(--depth,0)*0.875rem+0.5rem)] text-sm text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:outline-3 focus-visible:outline-primary/25 data-disabled:cursor-not-allowed data-disabled:opacity-75",
    branchIndicator:
      "shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-90 [&>svg]:size-full",
    branchText: "min-w-0 flex-1 truncate",
    branchContent: "flex min-w-0 flex-col gap-px overflow-hidden",
    item: "flex w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 ps-[calc(var(--depth,0)*0.875rem+0.5rem)] text-sm text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:outline-3 focus-visible:outline-primary/25 data-disabled:cursor-not-allowed data-disabled:opacity-75",
    itemText: "min-w-0 flex-1 truncate",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      sm: {
        branchControl: "py-0.5 text-xs",
        branchIndicator: "size-3.5",
        leadingIcon: "size-3.5",
        item: "py-0.5 text-xs",
      },
      md: {
        branchControl: "py-1 text-sm",
        branchIndicator: "size-4",
        leadingIcon: "size-4",
        item: "py-1 text-sm",
      },
      lg: {
        branchControl: "py-1.5 text-base",
        branchIndicator: "size-5",
        leadingIcon: "size-5",
        item: "py-1.5 text-base",
      },
    },
    /** Draw a guide line along nested content. */
    indentGuide: {
      true: { branchContent: "ms-4 border-s border-muted ps-1.5" },
      false: {},
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        branchControl: `data-selected:bg-${color}/10 data-selected:text-${color}`,
        item: `data-selected:bg-${color}/10 data-selected:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        branchControl: "data-selected:bg-elevated data-selected:text-highlighted",
        item: "data-selected:bg-elevated data-selected:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    indentGuide: true,
  },
});

export type TreeViewVariants = VariantProps<typeof treeView>;
export type TreeViewSlots = keyof ReturnType<typeof treeView>;

export type TreeViewUI = TVSlot<TreeViewSlots>;

export type TreeViewTheme = ThemeOverride<TreeViewSlots, TreeViewVariants>;

/**
 * One node in the tree.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 */
export interface TreeViewItem<F> {
  /** Identifies the node. Nodes under different parents must still differ. */
  value: string;
  /** What the row says. */
  label: string;
  /** Icon shown before the label. */
  icon?: F;
  disabled?: boolean;
  /** Children turn the node into a branch. A node without any is a leaf. */
  children?: TreeViewItem<F>[];
}

/**
 * Everything a TreeView accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The adapters build Ark's collection from `items` themselves, so callers never meet
 * `createTreeCollection`. A node is a branch when it has children, which the adapters
 * read off the same array.
 *
 * Selection and expansion are not here: React spells them `selectedValue` and
 * `expandedValue` with change callbacks, Vue spells them `v-model`, so each adapter
 * takes them from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface TreeViewProps<F> {
  /** Per-slot class overrides. */
  ui?: TreeViewUI;
  color?: TreeViewVariants["color"];
  size?: TreeViewVariants["size"];
  indentGuide?: TreeViewVariants["indentGuide"];
  /** The nodes to render, in order. */
  items: TreeViewItem<F>[];
  /** A heading above the tree, which also names it for a screen reader. */
  label?: string;
  /** Replaces the chevron turning beside an opening branch. */
  branchIndicatorIcon?: F;
  /** Whether several nodes may be selected at once. @defaultValue `"single"` */
  selectionMode?: "single" | "multiple";
  /** Wait until first expansion to mount a branch's rows. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount a branch's rows again once it closes. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TreeViewVariantsAreExposed = MustBeNever<
  Exclude<keyof TreeViewVariants, keyof TreeViewProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    treeView: ComponentContract<TreeViewSlots, TreeViewVariants>;
  }
}
