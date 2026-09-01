import { describe, expect, it } from "vitest";
import { tv } from "tailwind-variants";
import { layerTheme } from "../layer";
import { resolveTheme } from "../resolve";
import type { ComponentContract, ThemeConfig } from "../../types/theme";

const recipe = tv({
  slots: {
    base: "rounded-md p-1",
    leading: "shrink-0",
  },
  variants: {
    size: { md: { base: "h-8" }, lg: { base: "h-9" } },
    color: { primary: { base: "bg-primary" }, error: { base: "bg-error" } },
  },
  defaultVariants: { size: "md", color: "primary" },
});

declare global {
  interface Neo75ComponentThemes {
    probe: ComponentContract<
      "base" | "leading",
      { size?: "md" | "lg"; color?: "primary" | "error" }
    >;
  }
}

describe("resolveTheme", () => {
  it("leaves a component with no theme on the recipe's own defaults", () => {
    const { class: classes } = resolveTheme(recipe, undefined);

    expect(classes.base).toContain("rounded-md");
    expect(classes.base).toContain("bg-primary");
    expect(classes.base).toContain("h-8");
    expect(classes.leading).toContain("shrink-0");
  });

  it("applies a theme's ui override to the matching slot", () => {
    const { class: classes } = resolveTheme(recipe, { ui: { base: "p-2", leading: "mr-2" } });

    expect(classes.base).toContain("p-2");
    expect(classes.base).not.toContain("p-1");
    expect(classes.leading).toContain("mr-2");
  });

  it("lets the component's ui prop beat the theme", () => {
    const { class: classes } = resolveTheme(
      recipe,
      { ui: { base: "p-2" } },
      { ui: { base: "p-5" } },
    );

    expect(classes.base).toContain("p-5");
    expect(classes.base).not.toContain("p-2");
  });

  it("lets class beat the ui prop, which beats the theme", () => {
    const { class: classes } = resolveTheme(
      recipe,
      { ui: { base: "p-2" } },
      { ui: { base: "p-5" } },
      "p-9",
    );

    expect(classes.base).toContain("p-9");
    expect(classes.base).not.toContain("p-5");
    expect(classes.base).not.toContain("p-2");
  });

  it("applies class to base only", () => {
    const { class: classes } = resolveTheme(recipe, undefined, {}, "mr-2");

    expect(classes.base).toContain("mr-2");
    expect(classes.leading).not.toContain("mr-2");
  });

  it("keeps classes from every layer that do not conflict", () => {
    const { class: classes } = resolveTheme(
      recipe,
      { ui: { base: "rounded-sm font-bold" } },
      { ui: { base: "p-5" } },
      "tracking-wide",
    );

    expect(classes.base).toContain("rounded-sm");
    expect(classes.base).not.toContain("rounded-md");
    expect(classes.base).toContain("font-bold");
    expect(classes.base).toContain("p-5");
    expect(classes.base).toContain("tracking-wide");
  });

  it("resolves nested themes nearest-first and merges per slot", () => {
    const outer: ThemeConfig = { probe: { ui: { base: "p-2 rounded-sm", leading: "mr-2" } } };
    const inner: ThemeConfig = { probe: { ui: { base: "p-5" } } };

    const { class: classes } = resolveTheme(recipe, layerTheme(outer, inner).probe);

    expect(classes.base).toContain("rounded-sm");
    expect(classes.base).not.toContain("rounded-md");
    expect(classes.base).toContain("p-5");
    expect(classes.base).not.toContain("p-2");
    expect(classes.leading).toContain("mr-2");
  });

  it("merges theme props with the nearest theme winning", () => {
    const outer: ThemeConfig = { probe: { props: { size: "lg", color: "error" } } };
    const inner: ThemeConfig = { probe: { props: { color: "primary" } } };

    const { props } = resolveTheme(recipe, layerTheme(outer, inner).probe);

    expect(props).toEqual({ size: "lg", color: "primary" });
  });

  it("lets the component's own variant props beat the theme's", () => {
    const { props, class: classes } = resolveTheme(
      recipe,
      { props: { size: "lg", color: "error" } },
      { size: "md" },
    );

    expect(props).toEqual({ size: "md", color: "error" });
    expect(classes.base).toContain("h-8");
    expect(classes.base).toContain("bg-error");
  });

  it("resolves a variant added to the recipe without being told about it", () => {
    const extended = tv({
      slots: { base: "p-1" },
      variants: { tone: { flat: { base: "shadow-none" }, raised: { base: "shadow-md" } } },
      defaultVariants: { tone: "flat" },
    });

    const { props, class: classes } = resolveTheme(extended, undefined, { tone: "raised" });

    expect(props).toEqual({ tone: "raised" });
    expect(classes.base).toContain("shadow-md");
  });
});
