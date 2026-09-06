import type { CnFunction } from "cn";
import { createCn } from "cn/config";

/**
 * The `cn` merge configuration this library ships.
 *
 * @remarks
 * `cn` understands the seven-colour vocabulary with no configuration, because the
 * colour namespaces accept any bare word. Three non-colour namespaces do not merge
 * without being told — the header measure, the page measure, and the ten keyframe
 * animations — and they are equally broken under the unconfigured `tailwind-merge`
 * this replaces, so this extension fixes a latent bug rather than introducing one.
 * A future custom namespace that fails to merge earns its own entries here plus a
 * gate test; nothing is added preemptively.
 */
export const cnExtension = {
  extend: {
    theme: {
      spacing: ["header"],
      container: ["page"],
      animate: [
        "collapsible-down",
        "collapsible-up",
        "collapsible-right",
        "collapsible-left",
        "overlay-in",
        "overlay-out",
        "panel-in",
        "panel-out",
        "progress-sweep",
        "progress-sweep-block",
      ],
    },
  },
} as const;

/**
 * The one merge function both adapters share.
 *
 * @remarks
 * Built once, here, so React and Vue can never disagree on what wins. A part takes
 * `className` and this merges it over the recipe classes: one layer, not four.
 * `cn` concatenates nothing on its own terms — every call site wraps its `cva`
 * result in this, the way shadcn does, because `cva` never merges.
 */
export const cn: CnFunction = createCn(cnExtension);
