import { describe, expect, it } from "vitest";
import { applyThemeOverrides } from "../theme";
import type { ComponentContract, ThemeOverrideOf } from "../../types/theme";

const Key: unique symbol = Symbol("test");

declare global {
  interface Neo75ComponentThemes {
    [Key]: ComponentContract<
      "base" | "leading",
      {
        size?: "md" | "lg";
        color?: "primary" | "error";
      }
    >;
  }
}

type TestThemeOverride = ThemeOverrideOf<typeof Key>;

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
