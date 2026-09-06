import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * QrCode styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * There is no `color`. A code is a surface, and the library spends a hue on things
 * that carry meaning; the modules are drawn in the inverted tone and the card behind
 * them is the page, so the code scans the same in either theme.
 *
 * The card's padding is the quiet zone the scanner needs, so it grows with the size
 * rather than staying fixed: a bigger code wants a wider margin of page around it.
 */

export type QrCodeSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface QrCodeVariants {
  size: QrCodeSize;
}

export const qrCodeDefaults = { size: "md" } as const;

export const qrCodeSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const qrCodeParts = [
  { export: "QrCode", file: "qr-code", contract: "QrCodeRootProps" },
  { export: "QrCodeFrame", file: "frame", contract: null },
  { export: "QrCodeOverlay", file: "overlay", contract: null },
  {
    export: "QrCodeDownloadTrigger",
    file: "download-trigger",
    contract: "QrCodeDownloadTriggerProps",
  },
] as const satisfies readonly ComponentPart[];

export const qrCodeSizeData = {
  root: {
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3",
  },
  frame: {
    sm: "size-24",
    md: "size-32",
    lg: "size-40",
  },
  overlay: {
    sm: "size-5",
    md: "size-7",
    lg: "size-9",
  },
} as const satisfies Record<string, Record<QrCodeSize, string>>;

/**
 * Everything the QrCode root accepts in both frameworks.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. What stays is the
 * uncontrolled starting value both frameworks spell the same.
 */
export interface QrCodeRootProps {
  size?: QrCodeSize;
  /** The value encoded when rendered. Use when the code never changes afterwards. */
  defaultValue?: string;
  /** The encoded image's own resolution, in pixels. A sharper source scans better. */
  pixelSize?: number;
}

/** Everything a QrCode download button accepts in both frameworks. */
export interface QrCodeDownloadTriggerProps {
  /** The name the browser saves the image under. */
  fileName: string;
  /** The image format. @defaultValue `"image/png"` */
  mimeType?: "image/png" | "image/jpeg" | "image/svg+xml";
  /** Encoder quality for the lossy formats, between 0 and 1. */
  quality?: number;
}
