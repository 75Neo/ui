import { describe, expect, it } from "vitest";
import { variantValues } from "@75neo/core";
import { avatar, getAvatarInitials } from "../avatar";
import { assertRecipeIsTotal } from "./totality";

describe("avatar", () => {
  it("covers every combination of its own variants", () => {
    expect(() => assertRecipeIsTotal(avatar)).not.toThrow();
  });

  it("resolves a class for every slot it declares", () => {
    const resolved = avatar({});

    for (const slot of Object.keys(avatar.slots)) {
      expect(resolved[slot as keyof typeof resolved]()).not.toBe("");
    }
  });

  it("declares the variants components and previews read back", () => {
    expect(variantValues(avatar, "size")).toEqual(["xs", "sm", "md", "lg", "xl", "2xl"]);
    expect(variantValues(avatar, "shape")).toEqual(["circle", "square"]);
  });

  it("derives initials from a name", () => {
    expect(getAvatarInitials("Ada Lovelace")).toBe("AL");
    expect(getAvatarInitials("John")).toBe("JO");
    expect(getAvatarInitials("  ada   lovelace  ")).toBe("AL");
    expect(getAvatarInitials("  ")).toBe("");
    expect(getAvatarInitials("")).toBe("");
    expect(getAvatarInitials("a")).toBe("A");
    expect(getAvatarInitials("Mary Jane Watson")).toBe("MW");
  });
});
