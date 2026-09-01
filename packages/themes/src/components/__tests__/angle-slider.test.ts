import { describe, expect, it } from "vitest";
import { variantValues } from "@75neo/core";
import { angleSlider } from "../angle-slider";
import { assertRecipeIsTotal } from "./totality";

describe("angleSlider", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(angleSlider)).not.toThrow();
  });

  it("resolves a class for every slot it declares", () => {
    const resolved = angleSlider({});

    for (const slot of Object.keys(angleSlider.slots)) {
      expect(resolved[slot as keyof typeof resolved]()).not.toBe("");
    }
  });

  it("declares the variants components and previews read back", () => {
    expect(variantValues(angleSlider, "size")).toEqual(["sm", "md", "lg"]);
    expect(variantValues(angleSlider, "color")).toEqual([
      "primary",
      "secondary",
      "neutral",
      "success",
      "info",
      "warning",
      "error",
    ]);
  });
});
