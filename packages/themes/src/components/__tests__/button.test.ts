import { describe, expect, it } from "vitest";
import { variantValues } from "@75neo/core";
import { button } from "../button";
import { assertRecipeIsTotal } from "./totality";

describe("button", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(button)).not.toThrow();
  });

  it("resolves a class for every slot it declares", () => {
    const resolved = button({});

    for (const slot of Object.keys(button.slots)) {
      expect(resolved[slot as keyof typeof resolved]()).not.toBe("");
    }
  });

  it("declares the variants components and previews read back", () => {
    expect(variantValues(button, "variant")).toEqual(["solid", "soft", "outline", "ghost"]);
    expect(variantValues(button, "size")).toEqual(["xs", "sm", "md", "lg", "xl"]);
    expect(variantValues(button, "color")).toEqual([
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
