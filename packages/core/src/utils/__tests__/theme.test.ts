import { describe, expect, it } from "vitest";
import { applyThemeConfigs, applyThemeOverrides } from "../theme";
import type { ComponentContract, ThemeConfig, ThemeOverrideOf } from "../../types/theme";

declare global {
  interface Neo75ComponentThemes {
    test: ComponentContract<
      "base" | "leading",
      {
        size?: "md" | "lg";
        color?: "primary" | "error";
      }
    >;
  }
}

type TestThemeOverride = ThemeOverrideOf<"test">;

describe("applyThemeOverrides", () => {
  it("replace conflict classes in correct slot", () => {
    const a: TestThemeOverride = {
      ui: {
        base: "p-5 m-5",
        leading: "font-bold",
      },
    };
    const b: TestThemeOverride = {
      ui: {
        base: "p-12 m-5",
      },
    };

    const applied = applyThemeOverrides(a, b);
    expect(applied).toEqual({ ui: { base: "p-12 m-5", leading: "font-bold" }, props: {} });
  });

  it("shares no object with either input", () => {
    const a: TestThemeOverride = { ui: { base: "p-5" }, props: { color: "error" } };
    const b: TestThemeOverride = { ui: { leading: "font-bold" } };

    const applied = applyThemeOverrides(a, b);
    applied.ui!.base = "p-12";
    applied.ui!.leading = "font-normal";
    applied.props!.color = "primary";

    expect(a).toEqual({ ui: { base: "p-5" }, props: { color: "error" } });
    expect(b).toEqual({ ui: { leading: "font-bold" } });
  });

  it("override old props", () => {
    const a: TestThemeOverride = {
      props: {
        color: "error",
      },
    };
    const b: TestThemeOverride = {
      props: {
        color: "primary",
      },
    };

    const applied = applyThemeOverrides(a, b);
    expect(applied).toEqual({
      props: {
        color: "primary",
      },
      ui: undefined,
    });
  });
});

describe("applyThemeConfigs", () => {
  it("produces a config that survives serialization", () => {
    const outer: ThemeConfig = { test: { ui: { base: "rounded-sm" }, props: { color: "error" } } };
    const inner: ThemeConfig = { test: { ui: { base: "p-5" } } };

    const merged = applyThemeConfigs(outer, inner);

    expect(Object.keys(merged)).toEqual(["test"]);
    expect(JSON.parse(JSON.stringify(merged))).toEqual(merged);
  });
});
