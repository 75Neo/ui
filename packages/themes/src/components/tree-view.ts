import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * TreeView styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Indentation is not a variant either: rows indent off `--depth`, which Ark sets per
 * node, so the padding is arithmetic rather than a scale.
 */

export type TreeViewColor = ComponentColor;
export type TreeViewSize = "sm" | "md" | "lg";

/** How many nodes may be selected at once. @defaultValue `"single"` */
export type TreeViewSelectionMode = "single" | "multiple";

export const treeViewDefaults = { color: "primary", size: "md" } as const;

export const treeViewSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const treeViewParts = [
  { export: "TreeView", file: "tree-view", contract: "TreeViewRootProps" },
  { export: "TreeViewLabel", file: "label", contract: null },
  { export: "TreeViewTree", file: "tree", contract: null },
  { export: "TreeViewBranch", file: "branch", contract: null },
  { export: "TreeViewBranchControl", file: "branch-control", contract: null },
  { export: "TreeViewBranchIndicator", file: "branch-indicator", contract: null },
  { export: "TreeViewBranchText", file: "branch-text", contract: null },
  {
    export: "TreeViewBranchContent",
    file: "branch-content",
    contract: "TreeViewBranchContentProps",
  },
  { export: "TreeViewItem", file: "item", contract: null },
  { export: "TreeViewItemText", file: "item-text", contract: null },
] as const satisfies readonly ComponentPart[];

export const treeViewSizeData = {
  branchControl: {
    sm: "py-0.5 text-xs",
    md: "py-1 text-sm",
    lg: "py-1.5 text-base",
  },
  branchIndicator: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  item: {
    sm: "py-0.5 text-xs",
    md: "py-1 text-sm",
    lg: "py-1.5 text-base",
  },
} as const satisfies Record<string, Record<TreeViewSize, string>>;

/** One colour row, as `cva` compound variants read it. Shared by branches and leaves. */
export interface TreeViewRowCompound {
  color?: TreeViewColor;
  class: string;
}

export const treeViewRowCompoundData: TreeViewRowCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-selected:bg-${color}/10 data-selected:text-${color}`,
  })),
  {
    color: "neutral",
    class: "data-selected:bg-elevated data-selected:text-highlighted",
  },
];

/**
 * One node in the tree.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * Named `Node` because `TreeViewItem` is the part. A node is a branch when it has
 * children; a node without any is a leaf.
 */
export interface TreeViewNode<F> {
  /** Identifies the node. Nodes under different parents must still differ. */
  value: string;
  /** What the row says. */
  label: string;
  /** Icon shown before the label. */
  icon?: F;
  disabled?: boolean;
  /** Children turn the node into a branch. A node without any is a leaf. */
  children?: TreeViewNode<F>[];
}

/**
 * Everything a TreeView accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The adapters build Ark's collection from `items` themselves, so callers never meet
 * `createTreeCollection`.
 *
 * Selection and expansion are not here: React spells them `selectedValue` and
 * `expandedValue` with change callbacks, Vue spells them `v-model`, so each adapter
 * takes them from Ark's root instead.
 */
export interface TreeViewRootProps<F> {
  color?: TreeViewColor;
  size?: TreeViewSize;
  /** The nodes to render, in order. */
  items: TreeViewNode<F>[];
  /** A heading above the tree, which also names it for a screen reader. */
  label?: string;
  /** Replaces the chevron turning beside an opening branch. */
  branchIndicatorIcon?: F;
  /** Whether several nodes may be selected at once. @defaultValue `"single"` */
  selectionMode?: TreeViewSelectionMode;
  /** Wait until first expansion to mount a branch's rows. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount a branch's rows again once it closes. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/**
 * A branch's rows.
 *
 * @remarks
 * A part prop, not a root one: it is consumed by exactly one part.
 */
export interface TreeViewBranchContentProps {
  /** Draw a guide line along nested content. @defaultValue `true` */
  indentGuide?: boolean;
}
