/**
 * The introspection vocabulary: types for the schema objects and part descriptors
 * every data module carries beside its class data.
 *
 * @remarks
 * Recipes described themselves (`variantKeys`, `slots`); data modules do the same
 * through these shapes. Previews read schema values into their matrices, and the
 * docs reader resolves every descriptor entry through ts-morph — a renamed export,
 * file or contract fails the docs build rather than quietly dropping a table.
 */
export interface SchemaEntry {
  values: readonly unknown[];
  defaultValue: unknown;
  /** Part exports consuming this axis; absent means the root axes. */
  parts?: string[];
}

export type ComponentSchema = Record<string, SchemaEntry>;

export interface ComponentPart {
  /** Exported part name, e.g. `"AccordionItemTrigger"`. */
  export: string;
  /** File in the component directory, sans extension, e.g. `"item-trigger"`. */
  file: string;
  /** Shared contract in the data module, e.g. `"AccordionItemTriggerProps"` — or null. */
  contract: string | null;
}
