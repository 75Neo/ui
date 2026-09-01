import { describe, expect, it } from "vitest";
import { layerTheme } from "../layer";
import type { ComponentContract, ThemeConfig } from "../../types/theme";

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

describe("layerTheme", () => {
  it("replaces conflicting classes in the matching slot", () => {
    const outer: ThemeConfig = { test: { ui: { base: "p-5 m-5", leading: "font-bold" } } };
    const inner: ThemeConfig = { test: { ui: { base: "p-12 m-5" } } };

    expect(layerTheme(outer, inner)).toEqual({
      test: { ui: { base: "p-12 m-5", leading: "font-bold" } },
    });
  });

  it("lets the inner theme override the outer theme's props", () => {
    const outer: ThemeConfig = { test: { props: { size: "lg", color: "error" } } };
    const inner: ThemeConfig = { test: { props: { color: "primary" } } };

    expect(layerTheme(outer, inner)).toEqual({
      test: { props: { size: "lg", color: "primary" } },
    });
  });

  it("keeps components only one side mentions", () => {
    const outer: ThemeConfig = { test: { ui: { base: "p-5" } } };

    expect(layerTheme(outer, {})).toEqual({ test: { ui: { base: "p-5" } } });
    expect(layerTheme({}, outer)).toEqual({ test: { ui: { base: "p-5" } } });
  });

  it("shares no object with either input", () => {
    const outer: ThemeConfig = { test: { ui: { base: "p-5" }, props: { color: "error" } } };
    const inner: ThemeConfig = { test: { ui: { leading: "font-bold" } } };

    const layered = layerTheme(outer, inner);
    layered.test!.ui!.base = "p-12";
    layered.test!.ui!.leading = "font-normal";
    layered.test!.props!.color = "primary";

    expect(outer).toEqual({ test: { ui: { base: "p-5" }, props: { color: "error" } } });
    expect(inner).toEqual({ test: { ui: { leading: "font-bold" } } });
  });

  it("produces a config that survives serialization", () => {
    const outer: ThemeConfig = { test: { ui: { base: "rounded-sm" }, props: { color: "error" } } };
    const inner: ThemeConfig = { test: { ui: { base: "p-5" } } };

    const layered = layerTheme(outer, inner);

    expect(Object.keys(layered)).toEqual(["test"]);
    expect(JSON.parse(JSON.stringify(layered))).toEqual(layered);
  });
});
