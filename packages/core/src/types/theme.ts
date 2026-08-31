import type { TVClasses, TVSlot } from "./tv";

/**
 * The theme surface of one component: the slots it renders, and the props a theme may default.
 * Phantom properties — a contract is never constructed, only read at the type level.
 */
export interface ComponentContract<U extends string = string, P extends object = object> {
  slots: U;
  props: P;
}

declare global {
  /**
   * The open registry of component contracts, keyed by each component's `unique symbol`.
   *
   * `@75neo/core` declares it empty and imports nothing: every component adds its own entry
   * from its own module, which is what gives a theme literal per-component autocomplete without
   * core ever knowing the component list. The interface is type-only and erased at build time,
   * so it costs nothing at runtime and does not tie a bundle to components it never renders.
   * It is declared globally rather than on the module so that the declaration survives `.d.ts`
   * bundling and so that any package — not just this one — can register a component:
   *
   * ```ts
   * import type { ComponentContract } from "@75neo/core";
   *
   * export const InputKey: unique symbol = Symbol("app.input");
   *
   * declare global {
   *   interface Neo75ComponentThemes {
   *     [InputKey]: ComponentContract<"root" | "field", { size?: "sm" | "md" }>;
   *   }
   * }
   * ```
   */
  interface Neo75ComponentThemes {}
}

/** The registry of component contracts. An alias of the global `Neo75ComponentThemes`. */
export type ComponentThemes = Neo75ComponentThemes;

/** Any component key known to the registry. */
export type ComponentKey = keyof ComponentThemes;

/** The slot union declared by a component's contract. */
export type SlotsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<infer U, object> ? U : string;

/** The themeable prop bag declared by a component's contract. */
export type PropsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<string, infer P> ? P : object;

/** What a theme may say about a single component. */
export type ThemeOverride<U extends string = string, P extends object = object> = {
  /** Per-slot class overrides. A string replaces, a function transforms. */
  ui?: TVSlot<U>;
  /** Default props applied unless the component was given the prop explicitly. */
  props?: Partial<P>;
};

/**
 * The object literal a `<Theme>` accepts. Each entry is typed by the component its key
 * belongs to, so slots, prop names and prop values all autocomplete and typo-check.
 */
export type ThemeConfig = {
  [K in ComponentKey]?: ThemeOverride<SlotsOf<K>, PropsOf<K>>;
};

/**
 * One layer of overrides as the resolver sees it, with the per-component typing erased so
 * that any key can be looked up. A theme knows nothing about
 * its position in the tree — nesting is expressed by {@link ThemeScope}.
 */
export type Theme = {
  readonly [key: symbol]: ThemeOverride | undefined;
};

/**
 * A theme layer linked to the scope that encloses it. Scopes form a chain from the innermost
 * `<Theme>` outwards; nothing is merged until a component actually asks for its key, and the
 * result of that merge is memoised on the scope.
 */
export interface ThemeScope {
  readonly theme: Theme;
  readonly parent: ThemeScope | undefined;
  /** Per-component memo, filled lazily by `resolveTheme`. Never read this directly. */
  readonly cache: Map<symbol, ResolvedComponentTheme>;
}

/** The merged, theme-only view of one component — the cached half of a resolution. */
export interface ResolvedComponentTheme {
  /** Slot name to the override layers that apply to it, outermost first. */
  readonly ui: ReadonlyMap<string, readonly TVClasses[]>;
  /** Theme-provided default props, nearest scope winning. */
  readonly props: Readonly<Record<string, unknown>>;
}

/** What a component gets back from `resolveTheme`. */
export interface ResolvedTheme<U extends string = string, P extends object = object> {
  /**
   * Applies every override layer that targets `slot` to the classes the component's own
   * theme produced, lowest priority first, and returns the final class string.
   */
  class(slot: U, classes: string): string;
  /** Theme-provided defaults for this component, nearest scope winning. */
  readonly props: Partial<P>;
}
