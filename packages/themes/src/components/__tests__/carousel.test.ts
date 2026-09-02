import { describe, expect, it } from "vitest";
import { carousel } from "../carousel";
import { assertRecipeIsTotal } from "./totality";

describe("carousel", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(carousel)).not.toThrow();
  });
});
