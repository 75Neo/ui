import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useComponentUI } from "../useComponentUI";
import type { ThemeUI } from "@75neo/styles";

let mockThemeUi: ThemeUI = {};

vi.mock("../useTheme", () => ({
  injectThemeContext: () => ({
    ui: { value: mockThemeUi },
  }),
}));

const baseSlots = {
  base: (size: string) => `base-${size}`,
  label: (text: string) => `label-${text}`,
};

beforeEach(() => {
  mockThemeUi = {};
});

describe("useComponentUI", () => {
  it("returns computed with base classes when no overrides exist", () => {
    const result = useComponentUI("button", baseSlots);

    expect(result.value.base("md")).toBe("base-md");
    expect(result.value.label("ok")).toBe("label-ok");
  });

  it("applies string override from uiProp via twMerge", () => {
    const uiProp = ref({ base: "override-base" });
    const result = useComponentUI("button", baseSlots, uiProp);

    expect(result.value.base("md")).toBe("base-md override-base");
    expect(result.value.label("ok")).toBe("label-ok");
  });

  it("applies function override from uiProp", () => {
    const uiProp = ref({ base: (cls: string) => `${cls}--custom` });
    const result = useComponentUI("button", baseSlots, uiProp);

    expect(result.value.base("md")).toBe("base-md--custom");
  });

  it("applies string override from theme context via twMerge", () => {
    mockThemeUi = { button: { base: "ctx-base" } };
    const result = useComponentUI("button", baseSlots);

    expect(result.value.base("md")).toBe("base-md ctx-base");
  });

  it("applies function override from theme context", () => {
    mockThemeUi = {
      button: { base: (cls: string) => `${cls}--ctx` },
    };
    const result = useComponentUI("button", baseSlots);

    expect(result.value.base("md")).toBe("base-md--ctx");
  });

  it("uiProp overrides theme context", () => {
    mockThemeUi = { button: { base: "ctx-loses" } };
    const uiProp = ref({ base: "prop-wins" });
    const result = useComponentUI("button", baseSlots, uiProp);

    expect(result.value.base("md")).toBe("base-md prop-wins");
    expect(result.value.base("md")).not.toContain("ctx-loses");
  });

  it("reacts to uiProp changes", () => {
    const uiProp = ref<Record<string, string> | undefined>(undefined);
    const result = useComponentUI("button", baseSlots, uiProp);

    expect(result.value.base("md")).toBe("base-md");

    uiProp.value = { base: "new-prop" };
    expect(result.value.base("md")).toBe("base-md new-prop");
  });

  it("merges string override with tailwind-merge (conflicting utilities deduplicated)", () => {
    const twSlots = {
      base: () => "p-2 bg-red-500",
      label: () => "text-sm",
    };
    const uiProp = ref({ base: "p-4" });
    const result = useComponentUI("button", twSlots, uiProp);

    expect(result.value.base()).toBe("bg-red-500 p-4");
    expect(result.value.base()).not.toContain("p-2");
  });

  it("supports slots as computed ref (reactive to prop changes)", async () => {
    const { computed } = await import("vue");
    const variant = ref<string>("md");
    const tvSlots = computed(() => ({
      base: () => `base-${variant.value}`,
      label: (t: string) => `label-${t}`,
    }));
    const result = useComponentUI("button", tvSlots);

    expect(result.value.base()).toBe("base-md");

    variant.value = "lg";
    expect(result.value.base()).toBe("base-lg");
  });
});
