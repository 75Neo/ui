import { describe, expect, it } from "vitest";
import { variantValues } from "@75neo/core";
import { accordion } from "../accordion";
import { assertRecipeIsTotal } from "./totality";

describe("accordion", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(accordion)).not.toThrow();
  });

  it("resolves a class for every slot it declares", () => {
    const resolved = accordion({});

    for (const slot of Object.keys(accordion.slots)) {
      expect(resolved[slot as keyof typeof resolved]()).not.toBe("");
    }
  });

  it("declares the variants components and previews read back", () => {
    expect(variantValues(accordion, "variant")).toEqual(["outline", "soft", "ghost"]);
    expect(variantValues(accordion, "size")).toEqual(["sm", "md", "lg"]);
  });
});
