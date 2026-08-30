import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Accordion, AngleSlider, Avatar, Button, Carousel, Theme } from "../../index";

// happy-dom has no IntersectionObserver; zag's carousel machine needs one.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
} as unknown as typeof IntersectionObserver;

const slots = (html: string) => [...html.matchAll(/data-slot="([^"]+)"/g)].map((m) => m[1]);

describe("component render smoke", () => {
  it("Button renders every slot and honours the loading state", () => {
    const w = mount(Button, {
      slots: { default: "Go", leading: () => h("i"), trailing: () => h("i") },
    });
    expect(slots(w.html())).toEqual(["base", "leading", "label", "trailing"]);
    expect(w.text()).toContain("Go");

    const loading = mount(Button, {
      props: { loading: true },
      slots: { default: "Go", loadingIcon: () => h("i", { "data-testid": "spin" }) },
    });
    expect(loading.find("button").attributes("disabled")).toBeDefined();
    expect(loading.find('[data-testid="spin"]').exists()).toBe(true);
  });

  it("Accordion renders item data and per-item slots", () => {
    const w = mount(Accordion, {
      props: {
        defaultValue: "a",
        items: [
          { value: "a", label: "First", content: "Body A", leading: "*" },
          { value: "b", label: "Second", content: "Body B" },
        ],
      },
    });
    expect(slots(w.html())).toContain("trigger");
    expect(slots(w.html())).toContain("leading");
    expect(slots(w.html())).toContain("trailing");
    expect(w.text()).toContain("First");
    expect(w.text()).toContain("Body A");
  });

  it("Accordion scoped slots win over item data", () => {
    const w = mount(Accordion, {
      props: { defaultValue: "a", items: [{ value: "a", label: "First", content: "Body A" }] },
      slots: {
        label: ({ item, index }: { item: { value?: string }; index: number }) =>
          `${item.value}-${index}`,
        content: () => "overridden",
      },
    });
    expect(w.text()).toContain("a-0");
    expect(w.text()).toContain("overridden");
    expect(w.text()).not.toContain("Body A");
  });

  it("Avatar derives initials from alt and prefers the icon slot", () => {
    expect(mount(Avatar, { props: { alt: "Ada Lovelace" } }).text()).toBe("AL");
    const icon = mount(Avatar, { props: { alt: "Ada" }, slots: { icon: () => h("i") } });
    expect(slots(icon.html())).toContain("icon");
  });

  it("AngleSlider renders markers, value text and the hidden input", () => {
    const w = mount(AngleSlider, { props: { label: "Angle", defaultValue: 90 } });
    expect(slots(w.html())).toContain("markerGroup");
    expect(slots(w.html())).toContain("thumb");
    expect(slots(w.html())).toContain("valueText");
    expect(w.find("input[type=hidden]").exists()).toBe(true);
    // Ark supplies the formatted degree string when no valueText slot is given.
    expect(w.find('[data-slot="valueText"]').text()).toBe("90deg");

    const withSlot = mount(AngleSlider, {
      props: { defaultValue: 90 },
      slots: { valueText: ({ value }: { value: number }) => `${value} deg` },
    });
    expect(withSlot.find('[data-slot="valueText"]').text()).toBe("90 deg");
  });

  it("Carousel renders items, arrows and dots", () => {
    const w = mount(Carousel, {
      props: { arrows: true, dots: true, items: ["one", "two", "three"] },
    });
    expect(slots(w.html())).toContain("viewport");
    expect(w.findAll('[data-slot="item"]')).toHaveLength(3);
    expect(w.findAll('[data-slot="dot"]')).toHaveLength(3);
    expect(w.text()).toContain("one");
  });

  it("Carousel item slot receives the bag", () => {
    const w = mount(Carousel, {
      props: { items: [1, 2] },
      slots: {
        item: ({ item, index }: { item: { content?: string }; index: number }) =>
          `${item.content}:${index}`,
      },
    });
    expect(w.text()).toContain("1:0");
    expect(w.text()).toContain("2:1");
  });

  it("Theme ui overrides reach the right slot via the kebab-case key", () => {
    const w = mount(Theme, {
      props: { ui: { "angle-slider": { control: "ring-2" } } },
      slots: { default: () => h(AngleSlider, { defaultValue: 10 }) },
    });
    expect(w.find('[data-slot="control"]').classes()).toContain("ring-2");
  });
});
