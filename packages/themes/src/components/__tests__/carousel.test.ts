import { describe, expect, it } from "vitest";
import { carousel } from "../carousel";
import { assertRecipeIsTotal } from "./totality";

describe("carousel", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(carousel)).not.toThrow();
  });

  it("resolves a class for every slot it declares", () => {
    const resolved = carousel({});

    for (const slot of Object.keys(carousel.slots)) {
      expect(resolved[slot as keyof typeof resolved]()).not.toBe("");
    }
  });
});
