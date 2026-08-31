import { describe, expect, it } from "vitest";
import type { ComponentContract } from "../../types/theme";
import { applyTVClasses, createThemeScope, resolveTheme } from "../theme";

const Key: unique symbol = Symbol("test.button");
const OtherKey: unique symbol = Symbol("test.other");

// Two throwaway components, registered exactly the way a real one registers itself.
declare global {
  interface Neo75ComponentThemes {
    [Key]: ComponentContract<
      "base" | "leading",
      { size?: "md" | "lg"; color?: "primary" | "error" }
    >;
    [OtherKey]: ComponentContract<"root", { open?: boolean }>;
  }
}

describe("applyTVClasses", () => {
  it("keeps the classes when there is no override", () => {
    expect(applyTVClasses("p-1", undefined)).toBe("p-1");
  });

  it("replaces the classes with a string override", () => {
    expect(applyTVClasses("p-1", "p-4")).toBe("p-4");
  });

  it("hands the lower layers to a function override", () => {
    expect(applyTVClasses("p-1", (classes) => `${classes} shadow-lg`)).toBe("p-1 shadow-lg");
  });
});

describe("resolveTheme", () => {
  it("returns the component's own classes when there is no scope", () => {
    const resolved = resolveTheme(undefined, Key);
    expect(resolved.class("base", "p-1")).toBe("p-1");
    expect(resolved.props).toEqual({});
  });

  it("applies the ui prop over the component default", () => {
    const resolved = resolveTheme(undefined, Key, { base: "p-5" });
    expect(resolved.class("base", "p-1")).toBe("p-5");
  });

  it("lets the ui prop beat every theme scope", () => {
    const outer = createThemeScope({ [Key]: { ui: { base: "outer" } } });
    const inner = createThemeScope({ [Key]: { ui: { base: "inner" } } }, outer);

    expect(resolveTheme(inner, Key, { base: "local" }).class("base", "default")).toBe("local");
    expect(resolveTheme(inner, Key).class("base", "default")).toBe("inner");
    expect(resolveTheme(outer, Key).class("base", "default")).toBe("outer");
  });

  it("merges at the slot level rather than replacing the whole ui object", () => {
    const outer = createThemeScope({ [Key]: { ui: { base: "p-2", leading: "mr-2" } } });
    const inner = createThemeScope({ [Key]: { ui: { base: "p-4" } } }, outer);
    const resolved = resolveTheme(inner, Key);

    expect(resolved.class("base", "")).toBe("p-4");
    expect(resolved.class("leading", "")).toBe("mr-2");
  });

  it("resolves layers from the lowest priority upwards so functions see them", () => {
    const outer = createThemeScope({ [Key]: { ui: { base: (classes) => `${classes} outer` } } });
    const inner = createThemeScope(
      { [Key]: { ui: { base: (classes) => `${classes} inner` } } },
      outer,
    );
    const resolved = resolveTheme(inner, Key, { base: (classes) => `${classes} local` });

    expect(resolved.class("base", "default")).toBe("default outer inner local");
  });

  it("lets a string override discard the layers beneath it", () => {
    const outer = createThemeScope({ [Key]: { ui: { base: "outer" } } });
    const inner = createThemeScope({ [Key]: { ui: { base: "inner" } } }, outer);

    expect(resolveTheme(inner, Key).class("base", "default")).toBe("inner");
  });

  it("inherits slots the inner theme does not mention", () => {
    const outer = createThemeScope({ [Key]: { ui: { leading: "mr-2" } } });
    const middle = createThemeScope({ [OtherKey]: { ui: { root: "x" } } }, outer);
    const inner = createThemeScope({ [Key]: { ui: { base: "p-4" } } }, middle);
    const resolved = resolveTheme(inner, Key);

    expect(resolved.class("leading", "")).toBe("mr-2");
    expect(resolved.class("base", "")).toBe("p-4");
  });

  it("merges props with the nearest scope winning", () => {
    const outer = createThemeScope({ [Key]: { props: { size: "md", color: "error" } } });
    const inner = createThemeScope({ [Key]: { props: { size: "lg" } } }, outer);

    expect(resolveTheme(inner, Key).props).toEqual({ size: "lg", color: "error" });
  });

  it("ignores a component key the theme says nothing about", () => {
    const scope = createThemeScope({ [OtherKey]: { ui: { root: "x" } } });
    expect(resolveTheme(scope, Key).class("base", "p-1")).toBe("p-1");
    expect(resolveTheme(scope, Key).props).toEqual({});
  });

  it("memoises the merged chain per component key", () => {
    const scope = createThemeScope({ [Key]: { ui: { base: "p-4" } } });
    expect(scope.cache.size).toBe(0);

    resolveTheme(scope, Key);
    expect(scope.cache.size).toBe(1);

    resolveTheme(scope, Key);
    expect(scope.cache.size).toBe(1);

    resolveTheme(scope, OtherKey);
    expect(scope.cache.size).toBe(2);
  });

  it("does not resolve keys a subtree never asks for", () => {
    const outer = createThemeScope({ [OtherKey]: { ui: { root: "x" } } });
    const inner = createThemeScope({ [Key]: { ui: { base: "p-4" } } }, outer);

    resolveTheme(inner, Key);
    expect(outer.cache.has(OtherKey)).toBe(false);
  });
});
